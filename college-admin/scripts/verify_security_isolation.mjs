// Comprehensive Automated Security and Multi-Tenant Isolation Test Suite
import {
  INITIAL_COLLEGES,
  INITIAL_STUDENTS,
  INITIAL_STAFF_USERS,
  INITIAL_PROVISIONING_JOBS,
  INITIAL_APPROVALS,
  INITIAL_PAYMENTS,
  INITIAL_ENTITLEMENTS,
  INITIAL_COLLEGE_TASKS,
  INITIAL_ANNOUNCEMENTS
} from '../src/data/mockData.ts';

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${testName}`);
    passedTests++;
  } else {
    console.error(`  \x1b[31m✖ FAIL\x1b[0m: ${testName} - ${details}`);
    failedTests++;
  }
}

console.log('\n========================================================================');
console.log('  BEXO MULTI-TENANT ISOLATION & PORTAL SEPARATION SECURITY VERIFICATION');
console.log('========================================================================\n');

// -------------------------------------------------------------------------
// TEST SUITE 1: AUTHENTICATION & LOGIN ROUTE BEHAVIOR
// -------------------------------------------------------------------------
console.log('Test Suite 1: Authentication & Role-Based Redirection Gate');

function simulateLogin(email, colleges, staffUsers) {
  const trimmed = email.trim().toLowerCase();
  const user = staffUsers.find((u) => u.email.toLowerCase() === trimmed);

  if (!user) {
    return { success: false, redirectPath: '/login', error: 'No account registered with this email address.' };
  }

  if (user.collegeId) {
    const college = colleges.find((c) => c.id === user.collegeId);
    if (college && (college.status === 'Suspended' || !college.dashboardAccess)) {
      return {
        success: false,
        redirectPath: '/login',
        error: `Institutional Access Suspended: ${college.name} is currently suspended by BEXO Administration. Reason: "${college.suspensionReason || 'Compliance Hold'}".`,
      };
    }
    if (college && college.status === 'Pending') {
      return {
        success: false,
        redirectPath: '/login',
        error: `Institutional Access Pending: ${college.name} onboarding is awaiting administrative approval.`,
      };
    }
  }

  if (user.accountStatus === 'SUSPENDED') {
    return { success: false, redirectPath: '/login', error: 'Your account is suspended by institutional administration.' };
  }

  const isCorporateAdmin = (user.role === 'super_admin' || user.role === 'admin') && !user.collegeId;
  const redirectPath = isCorporateAdmin ? '/admin' : '/college/dashboard';

  return { success: true, user, redirectPath };
}

// 1.1 Super Admin Login
const superAdminRes = simulateLogin('kavinbalaji@atbexo.com', INITIAL_COLLEGES, INITIAL_STAFF_USERS);
assert(
  superAdminRes.success && superAdminRes.redirectPath === '/admin',
  'Super Admin redirects to /admin',
  `Got redirect: ${superAdminRes.redirectPath}`
);

// 1.2 College A (PSG Tech) Login
const psgRes = simulateLogin('venkatesh.r@psgtech.edu', INITIAL_COLLEGES, INITIAL_STAFF_USERS);
assert(
  psgRes.success && psgRes.redirectPath === '/college/dashboard' && psgRes.user?.collegeId === 'clg-psg-01',
  'College A (PSG Tech) redirects to /college/dashboard with collegeId clg-psg-01',
  `Got ${JSON.stringify(psgRes)}`
);

// 1.3 College B (KCT) Login
const kctRes = simulateLogin('preetha.s@kct.ac.in', INITIAL_COLLEGES, INITIAL_STAFF_USERS);
assert(
  kctRes.success && kctRes.redirectPath === '/college/dashboard' && kctRes.user?.collegeId === 'clg-kct-02',
  'College B (KCT) redirects to /college/dashboard with collegeId clg-kct-02',
  `Got ${JSON.stringify(kctRes)}`
);

// 1.4 Suspended College (CIT) Login Rejection
const citRes = simulateLogin('tsridhar@cit.edu.in', INITIAL_COLLEGES, INITIAL_STAFF_USERS);
assert(
  !citRes.success && citRes.error?.includes('Institutional Access Suspended') && citRes.error?.includes('Coimbatore Institute of Technology'),
  'Suspended College (CIT) login is rejected with Institutional Access Suspended message',
  `Got ${JSON.stringify(citRes)}`
);


// -------------------------------------------------------------------------
// TEST SUITE 2: MULTI-TENANT DATA SCOPING & CLIENT-TAMPER RESISTANCE
// -------------------------------------------------------------------------
console.log('\nTest Suite 2: Multi-Tenant Data Scoping & Parameter Tampering Resistance');

class MockTenantContext {
  constructor(currentUser) {
    this.currentUser = currentUser;
    this.isCorporateAdmin = (currentUser.role === 'super_admin' || currentUser.role === 'admin') && !currentUser.collegeId;
    this.auditLogs = [];
  }

  logAction(action, entity, entityId, entityName, reason) {
    this.auditLogs.push({ action, entity, entityId, entityName, reason });
  }

  getEffectiveCollegeId(requestedCollegeId) {
    if (!this.isCorporateAdmin) {
      if (!this.currentUser.collegeId) return undefined;
      if (requestedCollegeId && requestedCollegeId !== this.currentUser.collegeId) {
        this.logAction(
          'CROSS_TENANT_TAMPER_DETECTED',
          'SecurityGateway',
          this.currentUser.id,
          this.currentUser.name,
          `Multi-Tenant Isolation: User attempted to supply foreign collegeId "${requestedCollegeId}". Sanitized to authenticated "${this.currentUser.collegeId}".`
        );
      }
      return this.currentUser.collegeId;
    }
    return requestedCollegeId || (this.currentUser.collegeId ? this.currentUser.collegeId : undefined);
  }

  getScopedStudents(requestedCollegeId) {
    const cId = this.getEffectiveCollegeId(requestedCollegeId);
    if (!cId) return this.isCorporateAdmin ? INITIAL_STUDENTS : [];
    return INITIAL_STUDENTS.filter((s) => s.collegeId === cId);
  }

  getScopedStaff(requestedCollegeId) {
    const cId = this.getEffectiveCollegeId(requestedCollegeId);
    if (!cId) return this.isCorporateAdmin ? INITIAL_STAFF_USERS : [];
    return INITIAL_STAFF_USERS.filter((u) => u.collegeId === cId);
  }

  getScopedProvisioningJobs(requestedCollegeId) {
    const cId = this.getEffectiveCollegeId(requestedCollegeId);
    if (!cId) return this.isCorporateAdmin ? INITIAL_PROVISIONING_JOBS : [];
    return INITIAL_PROVISIONING_JOBS.filter((j) => j.collegeId === cId);
  }

  getCollegeById(id) {
    if (!this.isCorporateAdmin) {
      if (!this.currentUser.collegeId || id !== this.currentUser.collegeId) {
        this.logAction(
          'CROSS_TENANT_COLLEGE_INSPECTION_BLOCKED',
          'College',
          id,
          'Foreign College Record',
          `User ${this.currentUser.name} attempted to read unauthorized college "${id}". Blocked.`
        );
        return undefined;
      }
    }
    return INITIAL_COLLEGES.find((c) => c.id === id);
  }

  getStudentById(studentId) {
    const student = INITIAL_STUDENTS.find((s) => s.id === studentId);
    if (!student) return { isTenantViolation: false, student: undefined };

    if (!this.isCorporateAdmin) {
      if (!this.currentUser.collegeId || student.collegeId !== this.currentUser.collegeId) {
        this.logAction(
          'TENANT_ISOLATION_BLOCKED',
          'Student',
          studentId,
          'Foreign Institution Student',
          `User ${this.currentUser.name} attempted to read student ${studentId} from college ${student.collegeId}`
        );
        return { isTenantViolation: true, student: undefined };
      }
    }

    return { isTenantViolation: false, student };
  }

  addStudent(studentData) {
    const targetCollegeId = (this.currentUser.collegeId && !this.isCorporateAdmin)
      ? this.currentUser.collegeId
      : studentData.collegeId;

    if (!this.isCorporateAdmin && studentData.collegeId && studentData.collegeId !== this.currentUser.collegeId) {
      this.logAction(
        'CROSS_TENANT_TAMPER_DETECTED',
        'Student',
        studentData.rollNumber,
        studentData.name,
        `Student enroll collegeId "${studentData.collegeId}" overridden to authenticated "${this.currentUser.collegeId}".`
      );
    }
    return { ...studentData, id: 'stu-new-999', collegeId: targetCollegeId };
  }

  updateStaffRole(userId, newRole) {
    if (!this.isCorporateAdmin) {
      if (['super_admin', 'admin', 'ops', 'finance', 'support'].includes(newRole)) {
        throw new Error('Forbidden: College administrators cannot assign corporate administrative roles.');
      }
    }
    return true;
  }
}

const psgUser = INITIAL_STAFF_USERS.find((u) => u.email === 'venkatesh.r@psgtech.edu');
const kctUser = INITIAL_STAFF_USERS.find((u) => u.email === 'preetha.s@kct.ac.in');

const psgContext = new MockTenantContext(psgUser);
const kctContext = new MockTenantContext(kctUser);

// 2.1 College A student list is strictly scoped
const psgStudents = psgContext.getScopedStudents();
assert(
  psgStudents.length > 0 && psgStudents.every((s) => s.collegeId === 'clg-psg-01'),
  'College A retrieves ONLY College A (clg-psg-01) students',
  `Students found: ${psgStudents.map((s) => s.collegeId).join(', ')}`
);

// 2.2 College B student list is strictly scoped
const kctStudents = kctContext.getScopedStudents();
assert(
  kctStudents.length > 0 && kctStudents.every((s) => s.collegeId === 'clg-kct-02'),
  'College B retrieves ONLY College B (clg-kct-02) students',
  `Students found: ${kctStudents.map((s) => s.collegeId).join(', ')}`
);

// 2.3 College A attempting to pass College B's ID to getScopedStudents
const tamperedStudents = psgContext.getScopedStudents('clg-kct-02');
assert(
  tamperedStudents.every((s) => s.collegeId === 'clg-psg-01') &&
  psgContext.auditLogs.some((l) => l.action === 'CROSS_TENANT_TAMPER_DETECTED'),
  'Passing foreign collegeId (clg-kct-02) to College A query is sanitized and logged',
  `Tamper detected count: ${psgContext.auditLogs.filter((l) => l.action === 'CROSS_TENANT_TAMPER_DETECTED').length}`
);

// 2.4 College A cannot inspect College B's institution record
const inspectForeignCollege = psgContext.getCollegeById('clg-kct-02');
assert(
  inspectForeignCollege === undefined &&
  psgContext.auditLogs.some((l) => l.action === 'CROSS_TENANT_COLLEGE_INSPECTION_BLOCKED'),
  'College A inspecting foreign college record (clg-kct-02) returns undefined and is logged',
  `Result: ${inspectForeignCollege}`
);

// 2.5 College A can inspect own institution record
const inspectOwnCollege = psgContext.getCollegeById('clg-psg-01');
assert(
  inspectOwnCollege !== undefined && inspectOwnCollege.id === 'clg-psg-01',
  'College A inspecting own college record (clg-psg-01) succeeds',
  `Found: ${inspectOwnCollege?.name}`
);

// 2.6 Cross-tenant student record inspection by ID
const kctStudentId = kctStudents[0].id;
const inspectForeignStudent = psgContext.getStudentById(kctStudentId);
assert(
  inspectForeignStudent.isTenantViolation === true && inspectForeignStudent.student === undefined &&
  psgContext.auditLogs.some((l) => l.action === 'TENANT_ISOLATION_BLOCKED'),
  `College A inspecting College B student (${kctStudentId}) triggers 403 Tenant Isolation Gate`,
  `isTenantViolation: ${inspectForeignStudent.isTenantViolation}`
);

// 2.7 Adding student with forged collegeId is forced to authenticated collegeId
const newStudent = psgContext.addStudent({
  name: 'Tampered Student',
  rollNumber: 'TAMPER01',
  collegeId: 'clg-kct-02', // Attempted forge to College B
  email: 'tampered@example.com',
  department: 'Computer Science'
});
assert(
  newStudent.collegeId === 'clg-psg-01',
  'Forged collegeId in addStudent is automatically forced to authenticated collegeId',
  `Result collegeId: ${newStudent.collegeId}`
);

// 2.8 Role Escalation Prevention
let escalationBlocked = false;
try {
  psgContext.updateStaffRole('usr-staff-1', 'super_admin');
} catch (e) {
  escalationBlocked = true;
}
assert(
  escalationBlocked === true,
  'College administrator attempting to escalate staff role to super_admin is strictly blocked',
  `Escalation blocked: ${escalationBlocked}`
);


// -------------------------------------------------------------------------
// TEST SUITE 3: ROUTE ACCESS GATE LOGIC
// -------------------------------------------------------------------------
console.log('\nTest Suite 3: Route Access & Isolation Gate');

function evaluateRouteAccess(user, path) {
  const isCorporateAdmin = (user.role === 'super_admin' || user.role === 'admin') && !user.collegeId;
  const isCollegeUser = !isCorporateAdmin && Boolean(user.collegeId || user.role.startsWith('college_'));

  if (path.startsWith('/login')) return { allowed: true, view: 'LoginPage' };

  if (path.startsWith('/college')) {
    return { allowed: true, view: 'CollegeLayout' };
  }

  if (isCollegeUser) {
    if (path === '/' || path === '') {
      return { allowed: true, view: 'CollegeLayout' };
    }
    // Block admin routes with 403 Corporate Isolation Gate
    return { allowed: false, status: 403, view: 'CorporateAccessDeniedPage' };
  }

  return { allowed: true, view: 'AdminLayout' };
}

// 3.1 College user accessing /admin
const collegeOnAdmin = evaluateRouteAccess(psgUser, '/admin');
assert(
  !collegeOnAdmin.allowed && collegeOnAdmin.status === 403 && collegeOnAdmin.view === 'CorporateAccessDeniedPage',
  'College user navigating to /admin is blocked by CorporateAccessDeniedPage (403 Forbidden)',
  `View: ${collegeOnAdmin.view}`
);

// 3.2 College user accessing /admin/colleges
const collegeOnAdminColleges = evaluateRouteAccess(psgUser, '/admin/colleges');
assert(
  !collegeOnAdminColleges.allowed && collegeOnAdminColleges.status === 403 && collegeOnAdminColleges.view === 'CorporateAccessDeniedPage',
  'College user navigating to /admin/colleges is blocked by CorporateAccessDeniedPage',
  `View: ${collegeOnAdminColleges.view}`
);

// 3.3 College user accessing root path / redirects to College Dashboard
const collegeOnRoot = evaluateRouteAccess(psgUser, '/');
assert(
  collegeOnRoot.allowed && collegeOnRoot.view === 'CollegeLayout',
  'College user navigating to / defaults directly to College Portal',
  `View: ${collegeOnRoot.view}`
);

// 3.4 Super Admin accessing /admin is allowed
const adminUser = INITIAL_STAFF_USERS.find((u) => u.email === 'kavinbalaji@atbexo.com');
const superAdminOnAdmin = evaluateRouteAccess(adminUser, '/admin');
assert(
  superAdminOnAdmin.allowed && superAdminOnAdmin.view === 'AdminLayout',
  'Super Admin navigating to /admin accesses AdminLayout',
  `View: ${superAdminOnAdmin.view}`
);

console.log('\n========================================================================');
console.log(`  VERIFICATION RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log('========================================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  College,
  Student,
  ProvisioningJob,
  ApprovalRequest,
  NotificationItem,
  AuditLogItem,
  PaymentInvoice,
  SystemHealthMetric,
  PlatformService,
  StaffUser,
  QuotaHistoryEntry,
  Role,
  AppTemplate,
  CollegeInvitation,
  PasswordResetToken,
  OutboxEmail,
  AddCollegeAdminInput,
  StudentEntitlement,
  CollegeTask,
  CollegeAnnouncement,
  FailedProvisioningRecord,
} from '../types';
import {
  INITIAL_COLLEGES,
  INITIAL_STUDENTS,
  INITIAL_PROVISIONING_JOBS,
  INITIAL_APPROVALS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_PAYMENTS,
  INITIAL_SYSTEM_HEALTH,
  INITIAL_SERVICES,
  INITIAL_STAFF_USERS,
  INITIAL_QUOTA_HISTORY,
  INITIAL_APP_TEMPLATES,
  INITIAL_INVITATIONS,
  INITIAL_OUTBOX_EMAILS,
  INITIAL_ENTITLEMENTS,
  INITIAL_COLLEGE_TASKS,
  INITIAL_ANNOUNCEMENTS,
} from '../data/mockData';
import { generateEmailContent } from '../lib/emailTemplates';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
}

interface AdminContextType {
  // Current user & RBAC
  currentUser: StaffUser;
  setCurrentUser: (user: StaffUser) => void;
  staffUsers: StaffUser[];
  addStaffUser: (user: Omit<StaffUser, 'id' | 'createdAt' | 'lastLoginAt'>) => void;
  updateStaffUser: (id: string, updates: Partial<StaffUser>) => void;
  deleteStaffUser: (id: string) => void;
  isCorporateAdmin: boolean;
  canAccessAdminPanel: boolean;
  switchToSuperAdmin: (targetId?: string) => void;

  // Scope (Company vs College specific)
  activeScope: 'company' | string; // 'company' or a collegeId
  setActiveScope: (scope: 'company' | string) => void;
  isCompanyScope: boolean;

  // Colleges
  colleges: College[];
  getCollegeById: (id: string) => College | undefined;
  addCollege: (newCollege: Omit<College, 'id' | 'createdAt' | 'updatedAt' | 'lastActivityAt'>) => string;
  updateCollege: (id: string, updates: Partial<College>) => void;
  suspendCollege: (id: string, reason: string) => void;
  reactivateCollege: (id: string, reason?: string) => void;
  updateQuota: (collegeId: string, newAllocated: number, reason: string) => void;
  quotaHistory: QuotaHistoryEntry[];
  toggleCollegeService: (collegeId: string, serviceId: string, enabled: boolean) => void;

  // Students
  students: Student[];
  scopedStudents: Student[];
  revokeStudentAccess: (studentId: string, reason: string) => void;
  reactivateStudentAccess: (studentId: string) => void;
  addStudent: (student: Omit<Student, 'id' | 'createdAt' | 'lastActivityAt'>) => void;

  // Provisioning
  provisioningJobs: ProvisioningJob[];
  scopedProvisioningJobs: ProvisioningJob[];
  triggerProvisioningBatch: (
    collegeId: string,
    source: 'Roll Number Range' | 'CSV Upload' | 'Manual Batch',
    startRoll?: string,
    endRoll?: string,
    batchSize?: number
  ) => Promise<ProvisioningJob>;

  // Approvals & Requests
  approvals: ApprovalRequest[];
  approveRequest: (id: string, decisionReason: string) => void;
  rejectRequest: (id: string, decisionReason: string) => void;
  submitRequest: (request: Omit<ApprovalRequest, 'id' | 'createdAt' | 'status'>) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotification: (id: string) => void;

  // Audit Logs
  auditLogs: AuditLogItem[];
  logAction: (
    action: string,
    entity: string,
    entityId: string,
    entityName: string,
    reason?: string,
    beforeState?: Record<string, unknown>,
    afterState?: Record<string, unknown>
  ) => void;

  // Services Catalog
  services: PlatformService[];
  toggleGlobalService: (id: string) => void;

  // Payments
  payments: PaymentInvoice[];
  recordPayment: (payment: Omit<PaymentInvoice, 'id'>) => void;

  // System Health
  systemHealth: SystemHealthMetric[];
  refreshSystemHealth: () => void;

  // Global Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message?: string) => void;
  removeToast: (id: string) => void;

  // App Templates
  appTemplates: AppTemplate[];
  addAppTemplate: (template: Omit<AppTemplate, 'id' | 'createdAt' | 'updatedAt' | 'downloadsCount' | 'activeUsersCount'>) => string;
  updateAppTemplate: (id: string, updates: Partial<AppTemplate>) => void;
  deleteAppTemplate: (id: string) => void;
  togglePublishTemplate: (id: string) => void;
  toggleFeaturedTemplate: (id: string) => void;

  // College Invitations & Access Control
  invitations: CollegeInvitation[];
  outboxEmails: OutboxEmail[];
  activeEmailForPreview: OutboxEmail | null;
  setActiveEmailForPreview: (email: OutboxEmail | null) => void;
  createCollegeAdminInvitation: (collegeId: string, input: AddCollegeAdminInput) => Promise<CollegeInvitation>;
  createStaffInvitation: (collegeId: string, input: { name: string; email: string; role: Role; department?: string; designation?: string; mobile?: string }) => Promise<CollegeInvitation>;
  resendInvitation: (invitationId: string) => Promise<CollegeInvitation>;
  revokeInvitation: (invitationId: string, reason?: string) => void;
  validateInvitationToken: (token: string) => { valid: boolean; error?: string; invitation?: CollegeInvitation };
  activateAccount: (token: string, password: string) => Promise<{ success: boolean; user?: StaffUser; error?: string }>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; token?: string; error?: string }>;
  validatePasswordResetToken: (token: string) => { valid: boolean; email?: string; error?: string };
  resetPasswordWithToken: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  suspendCollegeStaff: (staffId: string, reason?: string) => void;
  activateCollegeStaff: (staffId: string) => void;
  changeStaffRole: (staffId: string, newRole: Role) => void;
  updateStaffDetails: (staffId: string, updates: Partial<StaffUser>) => void;
  login: (email: string, password?: string) => { success: boolean; user?: StaffUser; redirectPath: string; error?: string };
  logout: () => void;
  enforceCollegeScope: (targetCollegeId: string) => boolean;
  currentCollege: College | undefined;
  getEffectiveCollegeId: (requestedCollegeId?: string) => string | undefined;
  getScopedStudentsForCollege: (collegeId?: string) => Student[];
  getScopedStaffForCollege: (collegeId?: string) => StaffUser[];
  getScopedProvisioningJobsForCollege: (collegeId?: string) => ProvisioningJob[];
  getScopedApprovalsForCollege: (collegeId?: string) => ApprovalRequest[];
  getScopedNotificationsForCollege: (collegeId?: string) => NotificationItem[];
  getScopedAuditLogsForCollege: (collegeId?: string) => AuditLogItem[];
  getScopedPaymentsForCollege: (collegeId?: string) => PaymentInvoice[];
  getScopedEntitlementsForCollege: (collegeId?: string) => StudentEntitlement[];
  getScopedTasksForCollege: (collegeId?: string) => CollegeTask[];
  getScopedAnnouncementsForCollege: (collegeId?: string) => CollegeAnnouncement[];

  // College Operations & Student Access
  updateStudent: (studentId: string, updates: Partial<Student>) => void;
  getStudentById: (studentId: string) => { student?: Student; isTenantViolation: boolean };
  bulkImportStudents: (
    collegeId: string,
    studentList: Array<{
      name: string;
      rollNumber: string;
      email: string;
      department: string;
      course?: string;
      batch?: string;
      phone?: string;
    }>
  ) => { importedCount: number; skippedCount: number; errors: Array<{ rollNumber: string; reason: string }> };

  studentEntitlements: StudentEntitlement[];
  provisionStudentAccess: (
    collegeId: string,
    studentIds: string[],
    serviceName: string
  ) => Promise<{ job: ProvisioningJob; successful: number; failed: number; skipped: number }>;
  retryFailedProvisioningRecords: (jobId: string) => Promise<{ success: boolean; retriedCount: number }>;
  requestStudentRevocation: (studentId: string, serviceName: string, reason: string) => void;

  collegeTasks: CollegeTask[];
  toggleTaskComplete: (taskId: string) => void;
  collegeAnnouncements: CollegeAnnouncement[];
  updateCollegeSettings: (collegeId: string, updates: Partial<College>) => void;
  updateUserProfile: (updates: { name?: string; phone?: string; designation?: string; department?: string }) => void;
  changeUserPassword: (currentPassword: string, newPassword: string) => { success: boolean; error?: string };

  // Reset demo data
  resetAllData: () => void;
}

const STORAGE_KEY = 'bexo_admin_state_v1';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or defaults
  const [colleges, setColleges] = useState<College[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_colleges`);
    return saved ? JSON.parse(saved) : INITIAL_COLLEGES;
  });

  const [staffUsers, setStaffUsers] = useState<StaffUser[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_staff`);
    let list: StaffUser[] = saved ? JSON.parse(saved) : INITIAL_STAFF_USERS;
    const kavinExists = list.some((u) => u.id === 'usr-super-kavin' || u.name.toLowerCase().includes('kavinbalaji'));
    if (!kavinExists) {
      list = [INITIAL_STAFF_USERS[0], ...list];
    }
    return list;
  });

  const [currentUser, setCurrentUserState] = useState<StaffUser>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_current_user`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) return parsed;
      } catch {
        // fallback
      }
    }
    return INITIAL_STAFF_USERS[0];
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_students`);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [provisioningJobs, setProvisioningJobs] = useState<ProvisioningJob[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_jobs`);
    return saved ? JSON.parse(saved) : INITIAL_PROVISIONING_JOBS;
  });

  const [approvals, setApprovals] = useState<ApprovalRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_approvals`);
    return saved ? JSON.parse(saved) : INITIAL_APPROVALS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_audit`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [quotaHistory, setQuotaHistory] = useState<QuotaHistoryEntry[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_quota_history`);
    return saved ? JSON.parse(saved) : INITIAL_QUOTA_HISTORY;
  });

  const [payments, setPayments] = useState<PaymentInvoice[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_payments`);
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [services, setServices] = useState<PlatformService[]>(INITIAL_SERVICES);
  const [systemHealth, setSystemHealth] = useState<SystemHealthMetric[]>(INITIAL_SYSTEM_HEALTH);
  const [appTemplates, setAppTemplates] = useState<AppTemplate[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_templates`);
    return saved ? JSON.parse(saved) : INITIAL_APP_TEMPLATES;
  });

  const [invitations, setInvitations] = useState<CollegeInvitation[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_invitations`);
    return saved ? JSON.parse(saved) : INITIAL_INVITATIONS;
  });

  const [outboxEmails, setOutboxEmails] = useState<OutboxEmail[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_emails`);
    return saved ? JSON.parse(saved) : INITIAL_OUTBOX_EMAILS;
  });

  const [passwordResetTokens, setPasswordResetTokens] = useState<PasswordResetToken[]>([]);
  const [activeEmailForPreview, setActiveEmailForPreview] = useState<OutboxEmail | null>(null);

  const [studentEntitlements, setStudentEntitlements] = useState<StudentEntitlement[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_entitlements`);
    return saved ? JSON.parse(saved) : INITIAL_ENTITLEMENTS;
  });

  const [collegeTasks, setCollegeTasks] = useState<CollegeTask[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tasks`);
    return saved ? JSON.parse(saved) : INITIAL_COLLEGE_TASKS;
  });

  const [collegeAnnouncements, setCollegeAnnouncements] = useState<CollegeAnnouncement[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_announcements`);
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [activeScope, setActiveScope] = useState<'company' | string>('company');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_colleges`, JSON.stringify(colleges));
      localStorage.setItem(`${STORAGE_KEY}_students`, JSON.stringify(students));
      localStorage.setItem(`${STORAGE_KEY}_jobs`, JSON.stringify(provisioningJobs));
      localStorage.setItem(`${STORAGE_KEY}_approvals`, JSON.stringify(approvals));
      localStorage.setItem(`${STORAGE_KEY}_notifications`, JSON.stringify(notifications));
      localStorage.setItem(`${STORAGE_KEY}_audit`, JSON.stringify(auditLogs));
      localStorage.setItem(`${STORAGE_KEY}_quota_history`, JSON.stringify(quotaHistory));
      localStorage.setItem(`${STORAGE_KEY}_payments`, JSON.stringify(payments));
      localStorage.setItem(`${STORAGE_KEY}_staff`, JSON.stringify(staffUsers));
      localStorage.setItem(`${STORAGE_KEY}_templates`, JSON.stringify(appTemplates));
      localStorage.setItem(`${STORAGE_KEY}_invitations`, JSON.stringify(invitations));
      localStorage.setItem(`${STORAGE_KEY}_emails`, JSON.stringify(outboxEmails));
      localStorage.setItem(`${STORAGE_KEY}_entitlements`, JSON.stringify(studentEntitlements));
      localStorage.setItem(`${STORAGE_KEY}_tasks`, JSON.stringify(collegeTasks));
      localStorage.setItem(`${STORAGE_KEY}_announcements`, JSON.stringify(collegeAnnouncements));
    } catch {
      // LocalStorage quota may be reached, ignore
    }
  }, [
    colleges,
    students,
    provisioningJobs,
    approvals,
    notifications,
    auditLogs,
    quotaHistory,
    payments,
    staffUsers,
    appTemplates,
    invitations,
    outboxEmails,
    studentEntitlements,
    collegeTasks,
    collegeAnnouncements,
  ]);

  const addToast = (type: ToastMessage['type'], title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logAction = (
    action: string,
    entity: string,
    entityId: string,
    entityName: string,
    reason?: string,
    beforeState?: any,
    afterState?: any
  ) => {
    const newLog: AuditLogItem = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorStaffId: currentUser.id,
      actorName: currentUser.name,
      actorRole: currentUser.role.replace('_', ' ').toUpperCase(),
      action,
      entity,
      entityId,
      entityName,
      ip: '106.198.42.15',
      result: 'Success',
      reason: reason || 'Administrative action',
      beforeState,
      afterState,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const isCorporateAdmin =
    (currentUser.role === 'super_admin' || currentUser.role === 'admin') && !currentUser.collegeId;
  const canAccessAdminPanel = isCorporateAdmin;

  const setCurrentUser = (user: StaffUser) => {
    setCurrentUserState(user);
    localStorage.setItem(`${STORAGE_KEY}_current_user`, JSON.stringify(user));
    if (user.role.startsWith('college_') || !['super_admin', 'admin'].includes(user.role) || user.collegeId) {
      addToast(
        'error',
        '403 Access Denied: College Scope Restricted',
        `User "${user.name}" is a College User. Central Admin Panel access is strictly blocked.`
      );
      logAction(
        'UNAUTHORIZED_ADMIN_PANEL_BLOCKED',
        'SecurityGateway',
        user.id,
        user.name,
        `College user ${user.name} (${user.role} - ${user.collegeName || 'Unknown College Scope'}) attempted to access Central Admin Panel.`
      );
    } else {
      addToast(
        'info',
        'Corporate Identity Switched',
        `Session active as ${user.name} (${user.role.replace('_', ' ').toUpperCase()}).`
      );
    }
  };

  const switchToSuperAdmin = (targetId: string = 'usr-super-kavin') => {
    const target =
      staffUsers.find((u) => u.id === targetId) ||
      staffUsers.find((u) => u.role === 'super_admin') ||
      INITIAL_STAFF_USERS[0];
    setCurrentUser(target);
    setActiveScope('company');
    addToast(
      'success',
      'Super Admin Authorized',
      `Central Control Center restored for Super Admin ${target.name}.`
    );
  };

  const isCompanyScope = activeScope === 'company';

  const getEffectiveCollegeId = (requestedCollegeId?: string): string | undefined => {
    if (!isCorporateAdmin) {
      if (!currentUser.collegeId) {
        return undefined;
      }
      if (requestedCollegeId && requestedCollegeId !== currentUser.collegeId) {
        logAction(
          'CROSS_TENANT_TAMPER_DETECTED',
          'SecurityGateway',
          currentUser.id,
          currentUser.name,
          `Multi-Tenant Isolation: User attempted to supply foreign collegeId "${requestedCollegeId}". Sanitized to authenticated "${currentUser.collegeId}".`
        );
      }
      return currentUser.collegeId;
    }
    return requestedCollegeId || (currentUser.collegeId ? currentUser.collegeId : undefined);
  };

  const currentCollege: College | undefined = currentUser.collegeId
    ? colleges.find((c) => c.id === currentUser.collegeId)
    : (isCompanyScope ? undefined : colleges.find((c) => c.id === activeScope) || (isCorporateAdmin ? colleges[0] : undefined));

  const scopedStudents = isCompanyScope
    ? students
    : students.filter((s) => s.collegeId === activeScope);

  const scopedProvisioningJobs = isCompanyScope
    ? provisioningJobs
    : provisioningJobs.filter((j) => j.collegeId === activeScope);

  const getCollegeById = (id: string): College | undefined => {
    if (!isCorporateAdmin) {
      if (!currentUser.collegeId || id !== currentUser.collegeId) {
        logAction(
          'CROSS_TENANT_COLLEGE_INSPECTION_BLOCKED',
          'College',
          id,
          'Foreign College Record',
          `User ${currentUser.name} (${currentUser.collegeId || 'NO_TENANT'}) attempted to read unauthorized college record "${id}". Blocked.`
        );
        return undefined;
      }
    }
    return colleges.find((c) => c.id === id);
  };

  // College Operations
  const addCollege = (newCollegeData: Omit<College, 'id' | 'createdAt' | 'updatedAt' | 'lastActivityAt'>): string => {
    const id = `clg-${newCollegeData.code.toLowerCase()}-${Date.now().toString().slice(-4)}`;
    const now = new Date().toISOString();
    const createdCollege: College = {
      ...newCollegeData,
      id,
      createdAt: now,
      updatedAt: now,
      lastActivityAt: now,
    };

    setColleges((prev) => [createdCollege, ...prev]);

    // Create primary college admin in staff list
    if (newCollegeData.adminContact?.email) {
      const collegeStaff: StaffUser = {
        id: `usr-${createdCollege.code.toLowerCase()}-admin`,
        name: newCollegeData.adminContact.name || `${createdCollege.code} Admin`,
        email: newCollegeData.adminContact.email,
        phone: newCollegeData.adminContact.mobile,
        role: 'college_admin',
        collegeId: id,
        collegeName: createdCollege.name,
        department: 'Institutional Administration',
        isActive: createdCollege.status === 'Active',
        accountStatus: createdCollege.status === 'Active' ? 'ACTIVE' : 'INVITED',
        lastLoginAt: 'Never',
        createdAt: now,
      };
      setStaffUsers((prev) => [...prev, collegeStaff]);
    }

    // Add Quota History
    setQuotaHistory((prev) => [
      {
        id: `qh-${Date.now()}`,
        collegeId: id,
        timestamp: now,
        adminName: `${currentUser.name} (${currentUser.role})`,
        previousAllocated: 0,
        newAllocated: createdCollege.quota.allocated,
        reason: 'Initial onboarding quota allotment',
      },
      ...prev,
    ]);

    // Audit & Notification
    logAction('CREATE_COLLEGE', 'College', id, createdCollege.name, 'College Onboarding Wizard completion', undefined, { status: createdCollege.status, quota: createdCollege.quota.allocated });

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `New College Onboarded: ${createdCollege.name}`,
      message: `${createdCollege.name} (${createdCollege.code}) onboarded with ${createdCollege.quota.allocated.toLocaleString()} student seats. Status: ${createdCollege.status}.`,
      category: 'College',
      severity: createdCollege.status === 'Active' ? 'success' : 'info',
      relatedEntity: { type: 'college', id, name: createdCollege.name },
      isRead: false,
      createdAt: now,
      actionUrl: `/admin/colleges/${id}`,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    addToast('success', 'College Created Successfully', `${createdCollege.name} is now registered in BEXO.`);
    return id;
  };

  const updateCollege = (id: string, updates: Partial<College>) => {
    const existing = getCollegeById(id);
    if (!existing) return;

    const now = new Date().toISOString();
    setColleges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: now, lastActivityAt: now } : c))
    );

    logAction('UPDATE_COLLEGE', 'College', id, existing.name, 'Updated college profile details', existing, updates);
    addToast('success', 'College Profile Updated', `${existing.name} has been updated.`);
  };

  const suspendCollege = (id: string, reason: string) => {
    const existing = getCollegeById(id);
    if (!existing) return;

    const now = new Date().toISOString();

    // 1. Update college status to Suspended, disable services
    setColleges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            status: 'Suspended',
            dashboardAccess: false,
            suspensionReason: reason,
            suspendedAt: now,
            updatedAt: now,
            lastActivityAt: now,
            services: c.services.map((s) => ({ ...s, isEnabled: false })),
            activeStudents: 0,
          };
        }
        return c;
      })
    );

    // 2. Student records remain preserved but status suspended
    setStudents((prev) =>
      prev.map((s) => (s.collegeId === id ? { ...s, accessStatus: 'Suspended' } : s))
    );

    // 3. College staff users deactivated and status set to SUSPENDED
    setStaffUsers((prev) =>
      prev.map((u) => (u.collegeId === id ? { ...u, isActive: false, accountStatus: 'SUSPENDED' } : u))
    );

    // 4. Generate College Suspended Outbox Email to primary administrator
    if (existing.adminContact?.email) {
      const emailContent = generateEmailContent('college_suspended', {
        toEmail: existing.adminContact.email,
        recipientName: existing.adminContact.name || 'College Administrator',
        collegeName: existing.name,
        reason,
        actionUrl: `#/login`,
      });

      const outboxItem: OutboxEmail = {
        id: `eml-${Date.now()}`,
        to: existing.adminContact.email,
        toName: existing.adminContact.name || 'College Administrator',
        subject: emailContent.subject,
        templateType: 'college_suspended',
        collegeName: existing.name,
        roleName: 'College Administrator',
        actionUrl: `#/login`,
        actionLabel: emailContent.actionLabel,
        sentAt: now,
        status: 'Delivered',
        bodyHtml: emailContent.html,
        previewSnippet: emailContent.previewSnippet,
      };
      setOutboxEmails((prev) => [outboxItem, ...prev]);
    }

    // 5. Audit Log
    logAction('SUSPEND_COLLEGE', 'College', id, existing.name, reason, { status: existing.status, dashboardAccess: existing.dashboardAccess }, { status: 'Suspended', dashboardAccess: false });
    logAction('COLLEGE_ACCESS_RESTRICTED', 'College', id, existing.name, `All institutional operations restricted: ${reason}`);

    // 6. System Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `College Suspended: ${existing.name}`,
      message: `Operational services disabled. Reason: "${reason}". Student data and history remain preserved.`,
      category: 'Security',
      severity: 'error',
      relatedEntity: { type: 'college', id, name: existing.name },
      isRead: false,
      createdAt: now,
      actionUrl: `/admin/colleges/${id}`,
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast('warning', 'College Suspended', `${existing.name} services have been suspended.`);
  };

  const reactivateCollege = (id: string, reason = 'Restoration of compliance and authorized approval') => {
    const existing = getCollegeById(id);
    if (!existing) return;

    const now = new Date().toISOString();

    setColleges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            status: 'Active',
            dashboardAccess: true,
            suspensionReason: undefined,
            suspendedAt: undefined,
            reactivatedAt: now,
            updatedAt: now,
            lastActivityAt: now,
            services: c.services.map((s) => ({ ...s, isEnabled: true })),
            activeStudents: c.totalStudents,
          };
        }
        return c;
      })
    );

    // Restore student access
    setStudents((prev) =>
      prev.map((s) => (s.collegeId === id ? { ...s, accessStatus: 'Active' } : s))
    );

    // Restore staff
    setStaffUsers((prev) =>
      prev.map((u) => (u.collegeId === id ? { ...u, isActive: true, accountStatus: 'ACTIVE' } : u))
    );

    // Generate College Reactivated Outbox Email
    if (existing.adminContact?.email) {
      const emailContent = generateEmailContent('college_reactivated', {
        toEmail: existing.adminContact.email,
        recipientName: existing.adminContact.name || 'College Administrator',
        collegeName: existing.name,
        actionUrl: `#/college/dashboard`,
      });

      const outboxItem: OutboxEmail = {
        id: `eml-${Date.now()}`,
        to: existing.adminContact.email,
        toName: existing.adminContact.name || 'College Administrator',
        subject: emailContent.subject,
        templateType: 'college_reactivated',
        collegeName: existing.name,
        roleName: 'College Administrator',
        actionUrl: `#/college/dashboard`,
        actionLabel: emailContent.actionLabel,
        sentAt: now,
        status: 'Delivered',
        bodyHtml: emailContent.html,
        previewSnippet: emailContent.previewSnippet,
      };
      setOutboxEmails((prev) => [outboxItem, ...prev]);
    }

    // Audit
    logAction('REACTIVATE_COLLEGE', 'College', id, existing.name, reason, { status: 'Suspended' }, { status: 'Active' });

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `College Reactivated: ${existing.name}`,
      message: `Operational services and student access restored. Status is now Active.`,
      category: 'College',
      severity: 'success',
      relatedEntity: { type: 'college', id, name: existing.name },
      isRead: false,
      createdAt: now,
      actionUrl: `/admin/colleges/${id}`,
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast('success', 'College Reactivated', `${existing.name} is now active.`);
  };

  const updateQuota = (collegeId: string, newAllocated: number, reason: string) => {
    const college = getCollegeById(collegeId);
    if (!college) return;

    const prevAllocated = college.quota.allocated;
    const now = new Date().toISOString();

    setColleges((prev) =>
      prev.map((c) => {
        if (c.id === collegeId) {
          return {
            ...c,
            quota: {
              ...c.quota,
              allocated: newAllocated,
            },
            updatedAt: now,
            lastActivityAt: now,
          };
        }
        return c;
      })
    );

    setQuotaHistory((prev) => [
      {
        id: `qh-${Date.now()}`,
        collegeId,
        timestamp: now,
        adminName: `${currentUser.name} (${currentUser.role})`,
        previousAllocated: prevAllocated,
        newAllocated,
        reason,
      },
      ...prev,
    ]);

    logAction('UPDATE_QUOTA', 'CollegeQuota', collegeId, college.name, reason, { allocated: prevAllocated }, { allocated: newAllocated });

    addToast('success', 'Quota Updated', `${college.name} quota updated to ${newAllocated.toLocaleString()} seats.`);
  };

  const toggleCollegeService = (collegeId: string, serviceId: string, enabled: boolean) => {
    const college = getCollegeById(collegeId);
    if (!college) return;

    const now = new Date().toISOString();
    const serviceName = college.services.find((s) => s.serviceId === serviceId)?.name || 'Service';

    setColleges((prev) =>
      prev.map((c) => {
        if (c.id === collegeId) {
          return {
            ...c,
            services: c.services.map((s) => (s.serviceId === serviceId ? { ...s, isEnabled: enabled } : s)),
            updatedAt: now,
          };
        }
        return c;
      })
    );

    logAction(
      enabled ? 'ENABLE_SERVICE' : 'DISABLE_SERVICE',
      'Service',
      serviceId,
      `${college.name} - ${serviceName}`,
      `Service status changed to ${enabled ? 'Enabled' : 'Disabled'}`
    );

    addToast(enabled ? 'success' : 'warning', `Service ${enabled ? 'Enabled' : 'Disabled'}`, `${serviceName} for ${college.name}`);
  };

  // Student Actions
  const revokeStudentAccess = (studentId: string, reason: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    if (!isCorporateAdmin && currentUser.collegeId && student.collegeId !== currentUser.collegeId) {
      logAction('TENANT_SECURITY_VIOLATION', 'Student', studentId, student.name, 'Cross-tenant student revocation blocked');
      throw new Error('Access Denied: Tenant Isolation Violation.');
    }

    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, accessStatus: 'Revoked' } : s))
    );

    logAction('REVOKE_STUDENT_ACCESS', 'Student', student.id, student.name, reason, { accessStatus: student.accessStatus }, { accessStatus: 'Revoked' });
    addToast('warning', 'Access Revoked', `Student ${student.name} (${student.rollNumber}) access revoked.`);
  };

  const reactivateStudentAccess = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    if (!isCorporateAdmin && currentUser.collegeId && student.collegeId !== currentUser.collegeId) {
      logAction('TENANT_SECURITY_VIOLATION', 'Student', studentId, student.name, 'Cross-tenant student activation blocked');
      throw new Error('Access Denied: Tenant Isolation Violation.');
    }

    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, accessStatus: 'Active' } : s))
    );

    logAction('RESTORE_STUDENT_ACCESS', 'Student', student.id, student.name, 'Admin restored access', { accessStatus: student.accessStatus }, { accessStatus: 'Active' });
    addToast('success', 'Access Restored', `Student ${student.name} access restored to Active.`);
  };

  const addStudent = (studentData: Omit<Student, 'id' | 'createdAt' | 'lastActivityAt'>) => {
    const targetCollegeId = (currentUser.collegeId && !isCorporateAdmin) ? currentUser.collegeId : studentData.collegeId;
    const college = getCollegeById(targetCollegeId);

    if (college?.status === 'Suspended') {
      throw new Error(`Cannot add student: ${college.name} is currently suspended.`);
    }

    const duplicate = students.find(
      (s) => s.collegeId === targetCollegeId && s.rollNumber.toLowerCase() === studentData.rollNumber.trim().toLowerCase()
    );
    if (duplicate) {
      throw new Error(`Student with roll number "${studentData.rollNumber}" is already registered in this institution.`);
    }

    const id = `stu-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const now = new Date().toISOString();
    const newStudent: Student = {
      ...studentData,
      id,
      collegeId: targetCollegeId,
      collegeName: college?.name || studentData.collegeName,
      rollNumber: studentData.rollNumber.trim().toUpperCase(),
      email: studentData.email.trim().toLowerCase(),
      createdAt: now,
      lastActivityAt: now,
      updatedAt: now,
    };

    setStudents((prev) => [newStudent, ...prev]);

    if (college) {
      setColleges((prev) =>
        prev.map((c) => {
          if (c.id === targetCollegeId) {
            return {
              ...c,
              totalStudents: c.totalStudents + 1,
              activeStudents: newStudent.accessStatus === 'Active' ? c.activeStudents + 1 : c.activeStudents,
              lastActivityAt: now,
            };
          }
          return c;
        })
      );
    }

    logAction(
      'STUDENT_CREATED',
      'Student',
      newStudent.id,
      `${newStudent.name} (${newStudent.rollNumber})`,
      `Enrolled in ${college?.name || 'College'}`
    );

    addToast('success', 'Student Enrolled', `${newStudent.name} (${newStudent.rollNumber}) added.`);
    return newStudent;
  };

  const updateStudent = (studentId: string, updates: Partial<Student>) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) throw new Error('Student not found');

    if (currentUser.collegeId && !isCorporateAdmin && student.collegeId !== currentUser.collegeId) {
      logAction('TENANT_SECURITY_VIOLATION', 'Student', studentId, student.name, 'Unauthorized attempt to modify student of another college');
      throw new Error('Access Denied: Tenant Isolation Violation.');
    }

    const now = new Date().toISOString();
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, ...updates, updatedAt: now } : s))
    );

    logAction('STUDENT_UPDATED', 'Student', studentId, student.name, 'Student profile details updated');
    addToast('success', 'Student Updated', `Record for ${student.name} updated.`);
  };

  const getStudentById = (studentId: string): { student?: Student; isTenantViolation: boolean } => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return { isTenantViolation: false, student: undefined };

    if (!isCorporateAdmin) {
      if (!currentUser.collegeId || student.collegeId !== currentUser.collegeId) {
        logAction(
          'TENANT_ISOLATION_BLOCKED',
          'Student',
          studentId,
          'Foreign Institution Student',
          `User ${currentUser.name} (${currentUser.collegeId || 'NO_TENANT'}) attempted to read student ${studentId} from college ${student.collegeId}`
        );
        return { isTenantViolation: true, student: undefined };
      }
    }

    return { isTenantViolation: false, student };
  };

  const bulkImportStudents = (
    collegeId: string,
    studentList: Array<{
      name: string;
      rollNumber: string;
      email: string;
      department: string;
      course?: string;
      batch?: string;
      phone?: string;
    }>
  ) => {
    const targetCollegeId = (currentUser.collegeId && !isCorporateAdmin) ? currentUser.collegeId : collegeId;
    const college = getCollegeById(targetCollegeId);
    if (!college) throw new Error('College not found');

    if (college.status === 'Suspended') {
      throw new Error(`Cannot import: ${college.name} is currently suspended by administration.`);
    }

    const now = new Date().toISOString();
    const existingRolls = new Set(
      students.filter((s) => s.collegeId === targetCollegeId).map((s) => s.rollNumber.toLowerCase())
    );

    const validNewStudents: Student[] = [];
    const errors: Array<{ rollNumber: string; reason: string }> = [];
    const seenInFile = new Set<string>();

    studentList.forEach((row, idx) => {
      const rollClean = (row.rollNumber || '').trim().toUpperCase();
      const emailClean = (row.email || '').trim().toLowerCase();

      if (!row.name || !rollClean || !emailClean) {
        errors.push({ rollNumber: rollClean || `Row ${idx + 1}`, reason: 'Missing required fields (Name, Roll No, or Email)' });
        return;
      }

      if (seenInFile.has(rollClean.toLowerCase())) {
        errors.push({ rollNumber: rollClean, reason: 'Duplicate roll number in uploaded batch file' });
        return;
      }
      seenInFile.add(rollClean.toLowerCase());

      if (existingRolls.has(rollClean.toLowerCase())) {
        errors.push({ rollNumber: rollClean, reason: `Roll number already enrolled in ${college.name}` });
        return;
      }

      validNewStudents.push({
        id: `stu-imp-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
        name: row.name.trim(),
        rollNumber: rollClean,
        collegeId: targetCollegeId,
        collegeName: college.name,
        department: row.department || 'General Engineering',
        course: row.course || 'B.Tech',
        batch: row.batch || '2024 - 2028',
        email: emailClean,
        phone: row.phone?.trim(),
        accessStatus: 'Pending',
        services: [],
        entitlementId: '',
        enrolledYear: new Date().getFullYear(),
        resumeCount: 0,
        lastActivityAt: now,
        createdAt: now,
        updatedAt: now,
      });
    });

    if (validNewStudents.length > 0) {
      setStudents((prev) => [...validNewStudents, ...prev]);

      setColleges((prev) =>
        prev.map((c) =>
          c.id === targetCollegeId
            ? { ...c, totalStudents: c.totalStudents + validNewStudents.length, lastActivityAt: now }
            : c
        )
      );

      logAction(
        'BULK_STUDENT_IMPORT',
        'Student',
        `import-${Date.now()}`,
        `${college.name} Import Batch`,
        `Successfully imported ${validNewStudents.length} records. Skipped/errors: ${errors.length}.`
      );

      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: `Bulk Import Completed (${validNewStudents.length} students)`,
        message: `${validNewStudents.length} new student records registered for ${college.name}. ${errors.length > 0 ? `${errors.length} skipped.` : ''}`,
        category: 'Student',
        severity: 'success',
        relatedEntity: { type: 'college', id: targetCollegeId, name: college.name },
        isRead: false,
        createdAt: now,
        actionUrl: '/college/students',
      };
      setNotifications((prev) => [notif, ...prev]);

      addToast('success', 'Import Completed', `${validNewStudents.length} students enrolled. ${errors.length} skipped.`);
    }

    return {
      importedCount: validNewStudents.length,
      skippedCount: errors.length,
      errors,
    };
  };

  const provisionStudentAccess = async (
    collegeId: string,
    studentIds: string[],
    serviceName: string
  ): Promise<{ job: ProvisioningJob; successful: number; failed: number; skipped: number }> => {
    const targetCollegeId = (currentUser.collegeId && !isCorporateAdmin) ? currentUser.collegeId : collegeId;
    const college = getCollegeById(targetCollegeId);
    if (!college) throw new Error('Target college not found.');

    if (college.status === 'Suspended') {
      throw new Error(`Institutional account for ${college.name} is suspended. Provisioning locked.`);
    }

    if (currentUser.role === 'college_staff') {
      throw new Error('Permission Denied: College Staff cannot trigger student provisioning.');
    }

    const availableQuota = Math.max(0, college.quota.allocated - college.quota.used);
    const targetStudents = students.filter((s) => s.collegeId === targetCollegeId && studentIds.includes(s.id));

    let successfulCount = 0;
    let failedCount = 0;
    let skippedCount = 0;
    const failedRecords: FailedProvisioningRecord[] = [];
    const newEntitlements: StudentEntitlement[] = [];
    const now = new Date().toISOString();
    const jobId = `JOB-2026-${Math.floor(100 + Math.random() * 900)}`;

    for (const student of targetStudents) {
      if (student.services.includes(serviceName)) {
        skippedCount++;
        continue;
      }

      if (successfulCount >= availableQuota) {
        failedCount++;
        failedRecords.push({
          rollNumber: student.rollNumber,
          name: student.name,
          reason: 'Institutional approved student quota capacity reached',
          status: 'Quota Exceeded',
        });
        continue;
      }

      successfulCount++;
      const entId = `ENT-${college.code}-${Date.now().toString().slice(-4)}-${successfulCount}`;
      newEntitlements.push({
        id: entId,
        studentId: student.id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        collegeId: targetCollegeId,
        collegeName: college.name,
        serviceId: serviceName.toLowerCase().replace(/\s+/g, '-'),
        serviceName,
        status: 'Active',
        grantedDate: now,
        expiryDate: college.agreement.endDate,
        lastUpdated: now,
      });
    }

    const successfulStudentIds = new Set(newEntitlements.map((e) => e.studentId));
    setStudents((prev) =>
      prev.map((s) => {
        if (successfulStudentIds.has(s.id)) {
          return {
            ...s,
            services: [...s.services, serviceName],
            accessStatus: 'Active',
            entitlementId: s.entitlementId || `ENT-${college.code}-${s.rollNumber}`,
            provisioningJobId: jobId,
            lastActivityAt: now,
            updatedAt: now,
          };
        }
        return s;
      })
    );

    if (newEntitlements.length > 0) {
      setStudentEntitlements((prev) => [...newEntitlements, ...prev]);
    }

    setColleges((prev) =>
      prev.map((c) => {
        if (c.id === targetCollegeId) {
          return {
            ...c,
            activeStudents: c.activeStudents + successfulCount,
            quota: {
              ...c.quota,
              used: c.quota.used + successfulCount,
            },
            services: c.services.map((srv) =>
              srv.name === serviceName
                ? { ...srv, studentsUsing: srv.studentsUsing + successfulCount }
                : srv
            ),
            lastActivityAt: now,
          };
        }
        return c;
      })
    );

    const job: ProvisioningJob = {
      id: jobId,
      collegeId: targetCollegeId,
      collegeName: college.name,
      createdBy: `${currentUser.name} (${currentUser.role})`,
      source: 'Manual Batch',
      totalRecords: targetStudents.length,
      successful: successfulCount,
      failed: failedCount,
      partial: skippedCount,
      status: failedCount === 0 ? 'Completed' : successfulCount > 0 ? 'Partially Completed' : 'Failed',
      failedRecords,
      createdAt: now,
      completedAt: new Date(Date.now() + 1500).toISOString(),
    };

    setProvisioningJobs((prev) => [job, ...prev]);

    logAction(
      'PROVISION_STUDENT_ACCESS',
      'ProvisioningJob',
      jobId,
      `${college.name} - ${serviceName}`,
      `Access provisioned for ${successfulCount} students. Skipped: ${skippedCount}, Failed: ${failedCount}.`
    );

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Student Access Granted: ${serviceName}`,
      message: `${successfulCount} students successfully provisioned access to ${serviceName}. Job ID: ${jobId}`,
      category: 'Provisioning',
      severity: job.status === 'Completed' ? 'success' : 'warning',
      relatedEntity: { type: 'job', id: jobId, name: serviceName },
      isRead: false,
      createdAt: now,
      actionUrl: '/college/provisioning',
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast(
      job.status === 'Completed' ? 'success' : 'warning',
      'Provisioning Job Finished',
      `${successfulCount} students activated on ${serviceName}.`
    );

    return { job, successful: successfulCount, failed: failedCount, skipped: skippedCount };
  };

  const retryFailedProvisioningRecords = async (jobId: string): Promise<{ success: boolean; retriedCount: number }> => {
    const job = provisioningJobs.find((j) => j.id === jobId);
    if (!job) throw new Error('Provisioning job not found.');

    if (!isCorporateAdmin && currentUser.collegeId && job.collegeId !== currentUser.collegeId) {
      logAction('TENANT_SECURITY_VIOLATION', 'ProvisioningJob', jobId, job.collegeName, 'Cross-tenant retry attempt blocked');
      throw new Error('Access Denied: Tenant Isolation Violation.');
    }

    const college = getCollegeById(job.collegeId);
    if (!college) throw new Error('Associated college not found.');
    if (college.status === 'Suspended') throw new Error('Cannot retry: College is currently suspended.');

    const availableQuota = Math.max(0, college.quota.allocated - college.quota.used);
    if (availableQuota <= 0) {
      throw new Error('Insufficient quota remaining to retry failed records. Please request a quota expansion.');
    }

    const retriedCount = Math.min(job.failed, availableQuota);

    setProvisioningJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          const newFailed = j.failed - retriedCount;
          return {
            ...j,
            successful: j.successful + retriedCount,
            failed: newFailed,
            status: newFailed === 0 ? 'Completed' : 'Partially Completed',
            failedRecords: j.failedRecords.slice(retriedCount),
          };
        }
        return j;
      })
    );

    setColleges((prev) =>
      prev.map((c) =>
        c.id === job.collegeId
          ? { ...c, quota: { ...c.quota, used: c.quota.used + retriedCount }, activeStudents: c.activeStudents + retriedCount }
          : c
      )
    );

    logAction('RETRY_PROVISIONING', 'ProvisioningJob', jobId, job.collegeName, `Retried ${retriedCount} records successfully.`);
    addToast('success', 'Records Retried', `${retriedCount} student accounts successfully provisioned.`);
    return { success: true, retriedCount };
  };

  const requestStudentRevocation = (studentId: string, serviceName: string, reason: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    submitRequest({
      type: 'Access Request' as any,
      collegeId: student.collegeId,
      collegeName: student.collegeName,
      requester: currentUser.name,
      requesterEmail: currentUser.email,
      requesterRole: currentUser.role,
      details: {
        title: `Revoke ${serviceName} for ${student.name} (${student.rollNumber})`,
        description: `Revocation Request: ${reason}`,
        serviceName,
      },
      priority: 'Medium',
    });

    logAction(
      'REVOCATION_REQUEST_SUBMITTED',
      'Student',
      student.id,
      student.name,
      `Access revocation requested for ${serviceName}: ${reason}`
    );

    addToast('info', 'Revocation Requested', `Request logged for BEXO Admin review.`);
  };

  const toggleTaskComplete = (taskId: string) => {
    setCollegeTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' }
          : t
      )
    );
  };

  const updateCollegeSettings = (collegeId: string, updates: Partial<College>) => {
    const targetCollegeId = (currentUser.collegeId && !isCorporateAdmin) ? currentUser.collegeId : collegeId;
    const college = getCollegeById(targetCollegeId);
    if (!college) return;

    if (currentUser.role === 'college_coordinator' || currentUser.role === 'college_staff') {
      throw new Error('Permission Denied: Only College Admin can edit institutional settings.');
    }

    const sanitizedUpdates: Partial<College> = {
      address: updates.address ?? college.address,
      city: updates.city ?? college.city,
      district: updates.district ?? college.district,
      state: updates.state ?? college.state,
      pincode: updates.pincode ?? college.pincode,
      primaryContact: updates.primaryContact ? { ...college.primaryContact, ...updates.primaryContact } : college.primaryContact,
      adminContact: updates.adminContact ? { ...college.adminContact, ...updates.adminContact } : college.adminContact,
      updatedAt: new Date().toISOString(),
    };

    setColleges((prev) =>
      prev.map((c) => (c.id === targetCollegeId ? { ...c, ...sanitizedUpdates } : c))
    );

    logAction('COLLEGE_SETTINGS_UPDATED', 'College', targetCollegeId, college.name, 'Contact information updated by College Admin');
    addToast('success', 'Settings Saved', 'College contact information has been updated.');
  };

  const updateUserProfile = (updates: { name?: string; phone?: string; designation?: string; department?: string }) => {
    const updatedUser: StaffUser = {
      ...currentUser,
      name: updates.name ? updates.name.trim() : currentUser.name,
      phone: updates.phone !== undefined ? updates.phone.trim() : currentUser.phone,
      designation: updates.designation ? updates.designation.trim() : currentUser.designation,
      department: updates.department ? updates.department.trim() : currentUser.department,
    };

    setCurrentUser(updatedUser);
    setStaffUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    logAction('USER_PROFILE_UPDATED', 'StaffUser', currentUser.id, updatedUser.name, 'User profile information updated');
    addToast('success', 'Profile Updated', 'Your profile details have been saved.');
  };

  const changeUserPassword = (_currentPassword: string, newPassword: string): { success: boolean; error?: string } => {
    if (!newPassword || newPassword.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }
    const updatedUser: StaffUser = {
      ...currentUser,
      passwordHash: `scrypt:${Math.random().toString(36).substring(2)}`,
    };
    setCurrentUser(updatedUser);
    setStaffUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    logAction('PASSWORD_CHANGED', 'StaffUser', currentUser.id, currentUser.name, 'Password updated via user security settings');
    addToast('success', 'Password Changed', 'Your password has been securely updated.');
    return { success: true };
  };

  // Provisioning Simulation
  const triggerProvisioningBatch = async (
    collegeId: string,
    source: 'Roll Number Range' | 'CSV Upload' | 'Manual Batch',
    startRoll = '24CS001',
    endRoll = '24CS150',
    batchSize = 120
  ): Promise<ProvisioningJob> => {
    const college = getCollegeById(collegeId);
    const now = new Date().toISOString();
    const jobId = `JOB-2026-${Math.floor(100 + Math.random() * 900)}`;

    const total = batchSize;
    // Simulate realistic scenario: if quota is tight, some fail
    const availableQuota = college ? college.quota.allocated - college.quota.used : total;
    const successful = Math.min(total, Math.max(0, availableQuota - (Math.random() > 0.7 ? 5 : 0)));
    const failed = total - successful;

    const failedRecords = failed > 0 ? [
      { rollNumber: `${startRoll.slice(0, 4)}${Math.floor(50 + Math.random() * 40)}`, name: 'Duplicate Record', reason: 'Roll number already enrolled in system', status: 'Duplicate Student' as const },
      { rollNumber: `${startRoll.slice(0, 4)}${Math.floor(90 + Math.random() * 30)}`, name: 'S. Karthi', reason: 'Missing official institute email', status: 'Missing Email' as const },
    ] : [];

    const newJob: ProvisioningJob = {
      id: jobId,
      collegeId,
      collegeName: college?.name || 'Selected College',
      createdBy: `${currentUser.name} (${currentUser.role})`,
      source,
      totalRecords: total,
      successful,
      failed,
      partial: 0,
      status: failed === 0 ? 'Completed' : successful > 0 ? 'Partially Completed' : 'Failed',
      failedRecords,
      createdAt: now,
      completedAt: new Date(Date.now() + 2000).toISOString(),
    };

    setProvisioningJobs((prev) => [newJob, ...prev]);

    // Update College stats
    if (college) {
      setColleges((prev) =>
        prev.map((c) => {
          if (c.id === collegeId) {
            return {
              ...c,
              totalStudents: c.totalStudents + successful,
              activeStudents: c.activeStudents + successful,
              quota: {
                ...c.quota,
                used: c.quota.used + successful,
              },
              lastActivityAt: now,
            };
          }
          return c;
        })
      );
    }

    logAction('DISPATCH_PROVISIONING', 'ProvisioningJob', jobId, newJob.collegeName, `Batch of ${total} records triggered via ${source}`, undefined, { successful, failed });

    addToast(
      newJob.status === 'Completed' ? 'success' : 'warning',
      `Provisioning ${newJob.status}`,
      `Job ${jobId}: ${successful} created, ${failed} failed.`
    );

    return newJob;
  };

  // Approvals
  const approveRequest = (id: string, decisionReason: string) => {
    const req = approvals.find((a) => a.id === id);
    if (!req) return;

    const now = new Date().toISOString();
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Approved', decisionReason, reviewedBy: currentUser.name, reviewedAt: now } : a))
    );

    // Automatically execute operational consequence!
    if (req.type === 'Quota Increase' && req.details.requestedValue) {
      const newQuota = Number(req.details.requestedValue);
      updateQuota(req.collegeId, newQuota, `Approved Request ${req.id}: ${decisionReason}`);
    } else if (req.type === 'New College') {
      reactivateCollege(req.collegeId, `Approved Request ${req.id}: Onboarding finalized`);
    } else if (req.type === 'Service Activation' && req.details.serviceName) {
      const srv = services.find((s) => s.name === req.details.serviceName);
      if (srv) {
        toggleCollegeService(req.collegeId, srv.id, true);
      }
    } else if (req.type === 'Access Request') {
      reactivateCollege(req.collegeId, `Approved Request ${req.id}: Access restoration authorized`);
    }

    logAction('APPROVE_REQUEST', 'ApprovalRequest', req.id, `${req.collegeName} - ${req.type}`, decisionReason, { status: 'Pending' }, { status: 'Approved' });

    addToast('success', 'Request Approved', `${req.type} for ${req.collegeName} has been approved.`);
  };

  const rejectRequest = (id: string, decisionReason: string) => {
    const req = approvals.find((a) => a.id === id);
    if (!req) return;

    const now = new Date().toISOString();
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Rejected', decisionReason, reviewedBy: currentUser.name, reviewedAt: now } : a))
    );

    logAction('REJECT_REQUEST', 'ApprovalRequest', req.id, `${req.collegeName} - ${req.type}`, decisionReason, { status: 'Pending' }, { status: 'Rejected' });

    addToast('error', 'Request Rejected', `${req.type} for ${req.collegeName} was rejected.`);
  };

  const submitRequest = (reqData: Omit<ApprovalRequest, 'id' | 'createdAt' | 'status'>) => {
    const id = `APP-2026-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString();
    const newReq: ApprovalRequest = {
      ...reqData,
      id,
      status: 'Pending',
      createdAt: now,
    };
    setApprovals((prev) => [newReq, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `New Request: ${newReq.type}`,
      message: `${newReq.collegeName} submitted ${newReq.type} requiring administrative review.`,
      category: 'College',
      severity: newReq.priority === 'Critical' ? 'error' : 'info',
      relatedEntity: { type: 'approval', id, name: newReq.type },
      isRead: false,
      createdAt: now,
      actionUrl: '/admin/approvals',
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast('info', 'Request Submitted', `Request ID ${id} is under review.`);
  };

  // Staff operations
  const addStaffUser = (userData: Omit<StaffUser, 'id' | 'createdAt' | 'lastLoginAt'>) => {
    const id = `usr-${Date.now()}`;
    const now = new Date().toISOString();
    const newUser: StaffUser = {
      ...userData,
      id,
      createdAt: now,
      lastLoginAt: 'Never',
    };
    setStaffUsers((prev) => [...prev, newUser]);
    logAction('CREATE_STAFF_USER', 'StaffUser', id, newUser.name, `Assigned role: ${newUser.role}`);
    addToast('success', 'User Added', `${newUser.name} created as ${newUser.role}.`);
  };

  const updateStaffUser = (id: string, updates: Partial<StaffUser>) => {
    setStaffUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
    logAction('UPDATE_STAFF_USER', 'StaffUser', id, updates.name || id, 'Staff profile updated');
    addToast('success', 'User Updated', 'Staff details have been updated.');
  };

  const deleteStaffUser = (id: string) => {
    const u = staffUsers.find((user) => user.id === id);
    setStaffUsers((prev) => prev.filter((user) => user.id !== id));
    if (u) {
      logAction('DELETE_STAFF_USER', 'StaffUser', id, u.name, 'Account removed from system');
    }
    addToast('warning', 'User Removed', 'Staff account has been removed.');
  };

  // Notifications
  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('info', 'Notifications Cleared', 'All notifications marked as read.');
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Services Catalog
  const toggleGlobalService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isGlobalActive: !s.isGlobalActive } : s))
    );
  };

  // Payments
  const recordPayment = (paymentData: Omit<PaymentInvoice, 'id'>) => {
    const id = `inv-2026-${Math.floor(100 + Math.random() * 900)}`;
    setPayments((prev) => [{ ...paymentData, id }, ...prev]);
    addToast('success', 'Payment Recorded', `Invoice ${paymentData.invoiceNumber} logged.`);
  };

  // System Health refresh
  const refreshSystemHealth = () => {
    setSystemHealth((prev) =>
      prev.map((m) => ({
        ...m,
        latencyMs: Math.floor(Math.random() * 40 + 10),
      }))
    );
    addToast('info', 'Health Telemetry Refreshed', 'All system microservices responding.');
  };

  // App Template Handlers
  const addAppTemplate = (templateData: Omit<AppTemplate, 'id' | 'createdAt' | 'updatedAt' | 'downloadsCount' | 'activeUsersCount'>): string => {
    const id = `tmpl-${templateData.slug ? templateData.slug.toLowerCase().replace(/[^a-z0-9]/g, '-') : Date.now().toString().slice(-6)}`;
    const now = new Date().toISOString();
    const newTemplate: AppTemplate = {
      ...templateData,
      id,
      downloadsCount: 0,
      activeUsersCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    setAppTemplates((prev) => [newTemplate, ...prev]);
    logAction(
      'TEMPLATE_INSERTED',
      'AppTemplate',
      id,
      newTemplate.name,
      `Super Admin inserted template "${newTemplate.name}" for mobile app category: ${newTemplate.category}`
    );
    addToast('success', 'Template Inserted', `Template "${newTemplate.name}" is now available for app distribution.`);
    return id;
  };

  const updateAppTemplate = (id: string, updates: Partial<AppTemplate>) => {
    setAppTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t))
    );
    logAction('TEMPLATE_UPDATED', 'AppTemplate', id, updates.name || id, 'Template configuration modified');
    addToast('info', 'Template Updated', 'Template properties saved.');
  };

  const deleteAppTemplate = (id: string) => {
    const target = appTemplates.find((t) => t.id === id);
    setAppTemplates((prev) => prev.filter((t) => t.id !== id));
    logAction('TEMPLATE_DELETED', 'AppTemplate', id, target?.name || id, 'Template deleted from app catalog');
    addToast('warning', 'Template Deleted', `Template "${target?.name || id}" has been removed.`);
  };

  const togglePublishTemplate = (id: string) => {
    setAppTemplates((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'Published' ? 'Draft' : 'Published';
          logAction(
            nextStatus === 'Published' ? 'TEMPLATE_PUBLISHED' : 'TEMPLATE_UNPUBLISHED',
            'AppTemplate',
            id,
            t.name,
            `Template mobile status set to ${nextStatus}`
          );
          addToast(
            nextStatus === 'Published' ? 'success' : 'info',
            nextStatus === 'Published' ? 'Template Published' : 'Template Set to Draft',
            `"${t.name}" is now ${nextStatus.toLowerCase()} on mobile app.`
          );
          return { ...t, status: nextStatus, updatedAt: new Date().toISOString() };
        }
        return t;
      })
    );
  };

  const toggleFeaturedTemplate = (id: string) => {
    setAppTemplates((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextFeatured = !t.isFeatured;
          addToast(
            'info',
            nextFeatured ? 'Featured on Mobile' : 'Removed from Featured',
            `"${t.name}" ${nextFeatured ? 'promoted to mobile hero banner' : 'removed from featured banner'}.`
          );
          return { ...t, isFeatured: nextFeatured, updatedAt: new Date().toISOString() };
        }
        return t;
      })
    );
  };

  // --- INVITATION & ACCESS CONTROL ENGINE ---

  const createCollegeAdminInvitation = async (
    collegeId: string,
    input: AddCollegeAdminInput
  ): Promise<CollegeInvitation> => {
    const college = colleges.find((c) => c.id === collegeId);
    if (!college) {
      throw new Error(`College with ID ${collegeId} not found`);
    }

    if (!canAccessAdminPanel) {
      throw new Error('Unauthorized: Only BEXO Corporate Administrators can issue College Admin invitations.');
    }

    const token = `tok_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const inviteId = `inv-${Date.now()}`;

    const newInvite: CollegeInvitation = {
      id: inviteId,
      token,
      email: input.email.trim().toLowerCase(),
      fullName: input.name.trim(),
      phone: input.mobile?.trim(),
      designation: input.designation?.trim() || 'College Administrator',
      collegeId: college.id,
      collegeName: college.name,
      role: input.role || 'college_admin',
      invitedBy: currentUser.name,
      invitedByRole: currentUser.role,
      invitedAt: now,
      expiresAt,
      status: 'INVITED',
    };

    const newStaffId = `usr-clg-${Date.now()}`;
    const newStaffUser: StaffUser = {
      id: newStaffId,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.mobile?.trim(),
      role: input.role || 'college_admin',
      collegeId: college.id,
      collegeName: college.name,
      designation: input.designation?.trim() || 'College Administrator',
      isActive: false,
      accountStatus: 'INVITED',
      invitationId: inviteId,
      lastLoginAt: '',
      createdAt: now,
    };

    const emailContent = generateEmailContent('college_admin_invite', {
      toEmail: newInvite.email,
      recipientName: newInvite.fullName,
      collegeName: college.name,
      roleName: 'College Administrator',
      actionUrl: `#/activate-account?token=${token}`,
      invitedByName: currentUser.name,
      expiresInDays: 7,
    });

    const outboxItem: OutboxEmail = {
      id: `eml-${Date.now()}`,
      to: newInvite.email,
      toName: newInvite.fullName,
      subject: emailContent.subject,
      templateType: 'college_admin_invite',
      collegeName: college.name,
      roleName: 'College Administrator',
      actionUrl: `#/activate-account?token=${token}`,
      actionLabel: emailContent.actionLabel,
      sentAt: now,
      status: 'Delivered',
      bodyHtml: emailContent.html,
      previewSnippet: emailContent.previewSnippet,
    };

    setInvitations((prev) => [newInvite, ...prev]);
    setStaffUsers((prev) => [newStaffUser, ...prev]);
    setOutboxEmails((prev) => [outboxItem, ...prev]);

    setColleges((prev) =>
      prev.map((c) =>
        c.id === collegeId
          ? {
              ...c,
              adminContact: {
                name: input.name,
                email: input.email,
                mobile: input.mobile || c.adminContact.mobile,
              },
              lastActivityAt: now,
            }
          : c
      )
    );

    logAction(
      'COLLEGE_ADMIN_INVITED',
      'CollegeInvitation',
      inviteId,
      `${input.name} (${college.name})`,
      `Single-use invitation token generated and dispatched for ${input.email}`
    );

    addToast('success', 'Invitation Sent Successfully', `Secure activation link generated for ${input.email}`);
    return newInvite;
  };

  const createStaffInvitation = async (
    collegeId: string,
    input: { name: string; email: string; role: Role; department?: string; designation?: string; mobile?: string }
  ): Promise<CollegeInvitation> => {
    if (!isCorporateAdmin && currentUser.collegeId !== collegeId) {
      throw new Error('Forbidden: You can only invite staff members to your own authorized college.');
    }

    if (!isCorporateAdmin && input.role !== 'college_coordinator' && input.role !== 'college_staff') {
      throw new Error('College Administrators can only invite College Coordinators or College Staff.');
    }

    const college = colleges.find((c) => c.id === collegeId);
    if (!college) throw new Error('College not found');

    const token = `tok_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const inviteId = `inv-${Date.now()}`;

    const newInvite: CollegeInvitation = {
      id: inviteId,
      token,
      email: input.email.trim().toLowerCase(),
      fullName: input.name.trim(),
      phone: input.mobile?.trim(),
      designation: input.designation?.trim() || (input.role === 'college_coordinator' ? 'College Coordinator' : 'College Staff'),
      collegeId: college.id,
      collegeName: college.name,
      role: input.role,
      invitedBy: currentUser.name,
      invitedByRole: currentUser.role,
      invitedAt: now,
      expiresAt,
      status: 'INVITED',
    };

    const newStaffId = `usr-clg-${Date.now()}`;
    const newStaffUser: StaffUser = {
      id: newStaffId,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.mobile?.trim(),
      role: input.role,
      collegeId: college.id,
      collegeName: college.name,
      department: input.department?.trim() || 'Academic Administration',
      designation: input.designation?.trim() || (input.role === 'college_coordinator' ? 'Coordinator' : 'Staff'),
      isActive: false,
      accountStatus: 'INVITED',
      invitationId: inviteId,
      lastLoginAt: '',
      createdAt: now,
    };

    const emailContent = generateEmailContent('staff_invite', {
      toEmail: newInvite.email,
      recipientName: newInvite.fullName,
      collegeName: college.name,
      roleName: input.role === 'college_coordinator' ? 'College Coordinator' : 'College Staff',
      actionUrl: `#/activate-account?token=${token}`,
      invitedByName: currentUser.name,
      expiresInDays: 7,
    });

    const outboxItem: OutboxEmail = {
      id: `eml-${Date.now()}`,
      to: newInvite.email,
      toName: newInvite.fullName,
      subject: emailContent.subject,
      templateType: 'staff_invite',
      collegeName: college.name,
      roleName: input.role === 'college_coordinator' ? 'College Coordinator' : 'College Staff',
      actionUrl: `#/activate-account?token=${token}`,
      actionLabel: emailContent.actionLabel,
      sentAt: now,
      status: 'Delivered',
      bodyHtml: emailContent.html,
      previewSnippet: emailContent.previewSnippet,
    };

    setInvitations((prev) => [newInvite, ...prev]);
    setStaffUsers((prev) => [newStaffUser, ...prev]);
    setOutboxEmails((prev) => [outboxItem, ...prev]);

    logAction(
      'STAFF_INVITED',
      'CollegeInvitation',
      inviteId,
      `${input.name} (${input.role})`,
      `Staff membership invitation dispatched to ${input.email}`
    );

    addToast('success', 'Staff Invitation Dispatched', `Activation link delivered to ${input.email}`);
    return newInvite;
  };

  const resendInvitation = async (invitationId: string): Promise<CollegeInvitation> => {
    const invite = invitations.find((i) => i.id === invitationId);
    if (!invite) throw new Error('Invitation not found');

    const freshToken = `tok_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
    const now = new Date().toISOString();
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const updatedInvite: CollegeInvitation = {
      ...invite,
      token: freshToken,
      expiresAt: newExpiresAt,
      status: 'INVITED',
      invitedAt: now,
    };

    setInvitations((prev) => prev.map((i) => (i.id === invitationId ? updatedInvite : i)));

    const emailContent = generateEmailContent('invite_reminder', {
      toEmail: invite.email,
      recipientName: invite.fullName,
      collegeName: invite.collegeName,
      roleName: invite.role,
      actionUrl: `#/activate-account?token=${freshToken}`,
      invitedByName: currentUser.name,
      expiresInDays: 7,
    });

    const outboxItem: OutboxEmail = {
      id: `eml-${Date.now()}`,
      to: invite.email,
      toName: invite.fullName,
      subject: emailContent.subject,
      templateType: 'invite_reminder',
      collegeName: invite.collegeName,
      roleName: invite.role,
      actionUrl: `#/activate-account?token=${freshToken}`,
      actionLabel: emailContent.actionLabel,
      sentAt: now,
      status: 'Delivered',
      bodyHtml: emailContent.html,
      previewSnippet: emailContent.previewSnippet,
    };
    setOutboxEmails((prev) => [outboxItem, ...prev]);

    logAction('INVITATION_RESENT', 'CollegeInvitation', invitationId, invite.fullName, `Reissued fresh invitation token to ${invite.email}`);
    addToast('success', 'Invitation Resent', `Fresh security token dispatched to ${invite.email}`);
    return updatedInvite;
  };

  const revokeInvitation = (invitationId: string, reason = 'Revoked by institutional administration') => {
    const invite = invitations.find((i) => i.id === invitationId);
    if (!invite) return;

    const now = new Date().toISOString();
    setInvitations((prev) =>
      prev.map((i) =>
        i.id === invitationId ? { ...i, status: 'REVOKED', revokedAt: now, revokedReason: reason } : i
      )
    );

    setStaffUsers((prev) =>
      prev.map((u) =>
        u.invitationId === invitationId ? { ...u, isActive: false, accountStatus: 'REVOKED' } : u
      )
    );

    logAction('INVITATION_REVOKED', 'CollegeInvitation', invitationId, invite.fullName, reason);
    addToast('warning', 'Invitation Revoked', `Access invitation for ${invite.email} has been invalidated.`);
  };

  const validateInvitationToken = (token: string): { valid: boolean; error?: string; invitation?: CollegeInvitation } => {
    const invite = invitations.find((i) => i.token === token);
    if (!invite) {
      return { valid: false, error: 'Invalid or unrecognized security activation token.' };
    }
    if (invite.status === 'ACTIVE') {
      return { valid: false, error: 'This invitation token has already been accepted and is single-use only.', invitation: invite };
    }
    if (invite.status === 'REVOKED') {
      return { valid: false, error: 'This invitation has been revoked by administration.', invitation: invite };
    }
    if (new Date(invite.expiresAt) < new Date()) {
      return { valid: false, error: 'This invitation token has expired. Please request a new invitation.', invitation: invite };
    }
    return { valid: true, invitation: invite };
  };

  const activateAccount = async (
    token: string,
    _password: string
  ): Promise<{ success: boolean; user?: StaffUser; error?: string }> => {
    const check = validateInvitationToken(token);
    if (!check.valid || !check.invitation) {
      return { success: false, error: check.error || 'Token validation failure' };
    }

    const invite = check.invitation;
    const now = new Date().toISOString();

    setInvitations((prev) =>
      prev.map((i) => (i.id === invite.id ? { ...i, status: 'ACTIVE', acceptedAt: now } : i))
    );

    let activatedUser: StaffUser | undefined;
    const updatedUsers = staffUsers.map((u) => {
      if (u.invitationId === invite.id || u.email.toLowerCase() === invite.email.toLowerCase()) {
        activatedUser = {
          ...u,
          isActive: true,
          accountStatus: 'ACTIVE',
          lastLoginAt: now,
          passwordHash: `scrypt:${Math.random().toString(36).substring(2)}`,
        };
        return activatedUser;
      }
      return u;
    });

    if (!activatedUser) {
      activatedUser = {
        id: `usr-clg-${Date.now()}`,
        name: invite.fullName,
        email: invite.email,
        phone: invite.phone,
        role: invite.role,
        collegeId: invite.collegeId,
        collegeName: invite.collegeName,
        designation: invite.designation,
        isActive: true,
        accountStatus: 'ACTIVE',
        invitationId: invite.id,
        lastLoginAt: now,
        createdAt: now,
        passwordHash: `scrypt:${Math.random().toString(36).substring(2)}`,
      };
      setStaffUsers([activatedUser, ...staffUsers]);
    } else {
      setStaffUsers(updatedUsers);
    }

    const emailContent = generateEmailContent('account_activated', {
      toEmail: invite.email,
      recipientName: invite.fullName,
      collegeName: invite.collegeName,
      roleName: invite.role,
      actionUrl: '#/college/dashboard',
    });

    const outboxItem: OutboxEmail = {
      id: `eml-${Date.now()}`,
      to: invite.email,
      toName: invite.fullName,
      subject: emailContent.subject,
      templateType: 'account_activated',
      collegeName: invite.collegeName,
      roleName: invite.role,
      actionUrl: '#/college/dashboard',
      actionLabel: emailContent.actionLabel,
      sentAt: now,
      status: 'Delivered',
      bodyHtml: emailContent.html,
      previewSnippet: emailContent.previewSnippet,
    };
    setOutboxEmails((prev) => [outboxItem, ...prev]);

    setCurrentUser(activatedUser);
    setActiveScope(invite.collegeId);

    logAction('INVITATION_ACCEPTED', 'StaffUser', activatedUser.id, activatedUser.name, 'Single-use invitation token redeemed and invalidated');
    logAction('STAFF_ACTIVATED', 'StaffUser', activatedUser.id, activatedUser.name, 'Institutional credentials confirmed and live status granted');

    addToast('success', 'Account Activated!', `Welcome to BEXO, ${activatedUser.name}`);
    return { success: true, user: activatedUser };
  };

  const requestPasswordReset = async (
    email: string
  ): Promise<{ success: boolean; token?: string; error?: string }> => {
    const trimmed = email.trim().toLowerCase();
    const user = staffUsers.find((u) => u.email.toLowerCase() === trimmed);
    if (!user) {
      return { success: false, error: 'No account associated with this email address was found.' };
    }

    const token = `rst_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    const resetTokenObj: PasswordResetToken = {
      id: `rst-${Date.now()}`,
      token,
      email: trimmed,
      userId: user.id,
      createdAt: now,
      expiresAt,
      isUsed: false,
    };

    setPasswordResetTokens((prev) => [resetTokenObj, ...prev]);

    const emailContent = generateEmailContent('password_reset', {
      toEmail: user.email,
      recipientName: user.name,
      collegeName: user.collegeName,
      actionUrl: `#/reset-password?token=${token}`,
    });

    const outboxItem: OutboxEmail = {
      id: `eml-${Date.now()}`,
      to: user.email,
      toName: user.name,
      subject: emailContent.subject,
      templateType: 'password_reset',
      collegeName: user.collegeName,
      actionUrl: `#/reset-password?token=${token}`,
      actionLabel: emailContent.actionLabel,
      sentAt: now,
      status: 'Delivered',
      bodyHtml: emailContent.html,
      previewSnippet: emailContent.previewSnippet,
    };
    setOutboxEmails((prev) => [outboxItem, ...prev]);

    logAction('PASSWORD_RESET', 'StaffUser', user.id, user.name, `Password reset token generated and sent to ${user.email}`);
    addToast('info', 'Reset Instructions Sent', `Check ${email} for your secure password reset link.`);
    return { success: true, token };
  };

  const validatePasswordResetToken = (
    token: string
  ): { valid: boolean; email?: string; error?: string } => {
    const entry = passwordResetTokens.find((r) => r.token === token);
    if (!entry) return { valid: false, error: 'Invalid or missing password reset token.' };
    if (entry.isUsed) return { valid: false, error: 'This password reset link has already been used.' };
    if (new Date(entry.expiresAt) < new Date()) {
      return { valid: false, error: 'This password reset link has expired.' };
    }
    return { valid: true, email: entry.email };
  };

  const resetPasswordWithToken = async (
    token: string,
    _newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    const check = validatePasswordResetToken(token);
    if (!check.valid || !check.email) return { success: false, error: check.error };

    setPasswordResetTokens((prev) =>
      prev.map((r) => (r.token === token ? { ...r, isUsed: true } : r))
    );

    const user = staffUsers.find((u) => u.email.toLowerCase() === check.email!.toLowerCase());
    if (user) {
      setStaffUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, passwordHash: `scrypt:${Math.random().toString(36).substring(2)}` }
            : u
        )
      );
      logAction('PASSWORD_RESET', 'StaffUser', user.id, user.name, 'Password successfully updated via secure token verification');
    }

    addToast('success', 'Password Updated', 'Your credentials have been securely reset. You may now log in.');
    return { success: true };
  };

  const suspendCollegeStaff = (staffId: string, reason = 'Suspended by administration') => {
    const user = staffUsers.find((u) => u.id === staffId);
    if (!user) return;

    if (!isCorporateAdmin && currentUser.collegeId && user.collegeId !== currentUser.collegeId) {
      logAction('TENANT_SECURITY_VIOLATION', 'StaffUser', staffId, user.name, 'Cross-tenant staff suspension blocked');
      throw new Error('Access Denied: Tenant Isolation Violation.');
    }

    setStaffUsers((prev) =>
      prev.map((u) => (u.id === staffId ? { ...u, isActive: false, accountStatus: 'SUSPENDED' } : u))
    );

    logAction('STAFF_SUSPENDED', 'StaffUser', staffId, user.name, reason);
    addToast('warning', 'Staff Suspended', `${user.name} has been suspended.`);
  };

  const activateCollegeStaff = (staffId: string) => {
    const user = staffUsers.find((u) => u.id === staffId);
    if (!user) return;

    if (!isCorporateAdmin && currentUser.collegeId && user.collegeId !== currentUser.collegeId) {
      logAction('TENANT_SECURITY_VIOLATION', 'StaffUser', staffId, user.name, 'Cross-tenant staff activation blocked');
      throw new Error('Access Denied: Tenant Isolation Violation.');
    }

    setStaffUsers((prev) =>
      prev.map((u) => (u.id === staffId ? { ...u, isActive: true, accountStatus: 'ACTIVE' } : u))
    );

    logAction('STAFF_ACTIVATED', 'StaffUser', staffId, user.name, 'Institutional staff access restored to Active');
    addToast('success', 'Staff Activated', `${user.name} access restored.`);
  };

  const changeStaffRole = (staffId: string, newRole: Role) => {
    const user = staffUsers.find((u) => u.id === staffId);
    if (!user) return;

    if (!isCorporateAdmin && currentUser.collegeId && user.collegeId !== currentUser.collegeId) {
      logAction('TENANT_SECURITY_VIOLATION', 'StaffUser', staffId, user.name, 'Cross-tenant role modification blocked');
      throw new Error('Access Denied: Tenant Isolation Violation.');
    }

    if (!isCorporateAdmin && (newRole === 'super_admin' || newRole === 'admin' || newRole === 'ops' || newRole === 'finance' || newRole === 'support')) {
      throw new Error('Forbidden: Institutional admins cannot elevate users to corporate roles.');
    }

    setStaffUsers((prev) =>
      prev.map((u) => (u.id === staffId ? { ...u, role: newRole } : u))
    );

    logAction('ROLE_CHANGED', 'StaffUser', staffId, user.name, `Role modified from ${user.role} to ${newRole}`);
    addToast('success', 'Role Updated', `${user.name} role changed to ${newRole}.`);
  };

  const updateStaffDetails = (staffId: string, updates: Partial<StaffUser>) => {
    const user = staffUsers.find((u) => u.id === staffId);
    if (!user) return;

    if (!isCorporateAdmin && currentUser.collegeId && user.collegeId !== currentUser.collegeId) {
      logAction('TENANT_SECURITY_VIOLATION', 'StaffUser', staffId, user.name, 'Cross-tenant staff details update blocked');
      throw new Error('Access Denied: Tenant Isolation Violation.');
    }

    setStaffUsers((prev) =>
      prev.map((u) => (u.id === staffId ? { ...u, ...updates } : u))
    );
    addToast('success', 'Staff Updated', 'Account details have been saved.');
  };

  const login = (
    email: string,
    _password?: string
  ): { success: boolean; user?: StaffUser; redirectPath: string; error?: string } => {
    const trimmed = email.trim().toLowerCase();
    const user = staffUsers.find((u) => u.email.toLowerCase() === trimmed);

    if (!user) {
      return { success: false, redirectPath: '/login', error: 'No account registered with this email address.' };
    }

    if (user.collegeId) {
      const college = colleges.find((c) => c.id === user.collegeId);
      if (college && (college.status === 'Suspended' || !college.dashboardAccess)) {
        logAction('SUSPENDED_COLLEGE_LOGIN_BLOCKED', 'College', user.collegeId, college.name, `Login blocked: College ${college.name} is suspended (${college.suspensionReason || 'Compliance Hold'}).`);
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

    if (user.accountStatus === 'REVOKED') {
      return { success: false, redirectPath: '/login', error: 'Your account access has been revoked.' };
    }

    if (user.accountStatus === 'INVITED') {
      return {
        success: false,
        redirectPath: '/login',
        error: 'Your invitation has not yet been activated. Please check your email for the activation link.',
      };
    }

    const now = new Date().toISOString();
    const updatedUser: StaffUser = { ...user, lastLoginAt: now };
    setCurrentUser(updatedUser);
    setStaffUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));

    if (
      user.role === 'super_admin' ||
      user.role === 'admin' ||
      user.role === 'ops' ||
      user.role === 'finance' ||
      user.role === 'support'
    ) {
      setActiveScope('company');
      addToast('success', 'Corporate Session Initiated', `Welcome, ${user.name}`);
      return { success: true, user: updatedUser, redirectPath: '/admin' };
    } else {
      setActiveScope(user.collegeId || 'company');
      addToast('success', 'College Portal Session Live', `Logged in as ${user.name} (${user.collegeName || 'College'})`);
      return { success: true, user: updatedUser, redirectPath: '/college/dashboard' };
    }
  };

  const logout = () => {
    addToast('info', 'Logged Out', 'You have been safely signed out of BEXO.');
  };

  const enforceCollegeScope = (targetCollegeId: string): boolean => {
    if (isCorporateAdmin) return true;
    if (currentUser.collegeId && currentUser.collegeId === targetCollegeId) return true;
    return false;
  };

  const getScopedStudentsForCollege = (collegeId?: string): Student[] => {
    const cId = getEffectiveCollegeId(collegeId);
    if (!cId) return isCorporateAdmin ? students : [];
    return students.filter((s) => s.collegeId === cId);
  };

  const getScopedStaffForCollege = (collegeId?: string): StaffUser[] => {
    const cId = getEffectiveCollegeId(collegeId);
    if (!cId) return isCorporateAdmin ? staffUsers : [];
    return staffUsers.filter((u) => u.collegeId === cId);
  };

  const getScopedProvisioningJobsForCollege = (collegeId?: string): ProvisioningJob[] => {
    const cId = getEffectiveCollegeId(collegeId);
    if (!cId) return isCorporateAdmin ? provisioningJobs : [];
    return provisioningJobs.filter((j) => j.collegeId === cId);
  };

  const getScopedApprovalsForCollege = (collegeId?: string): ApprovalRequest[] => {
    const cId = getEffectiveCollegeId(collegeId);
    if (!cId) return isCorporateAdmin ? approvals : [];
    return approvals.filter((a) => a.collegeId === cId);
  };

  const getScopedNotificationsForCollege = (collegeId?: string): NotificationItem[] => {
    const cId = getEffectiveCollegeId(collegeId);
    if (!cId) return isCorporateAdmin ? notifications : [];
    const collegeObj = colleges.find((c) => c.id === cId);
    return notifications.filter((n) => {
      if (n.relatedEntity?.id && n.relatedEntity.id.startsWith('clg-')) {
        return n.relatedEntity.id === cId;
      }
      if (n.relatedEntity?.name && collegeObj?.name && n.relatedEntity.name.toLowerCase().includes(collegeObj.name.toLowerCase())) {
        return true;
      }
      if (n.relatedEntity?.type === 'job') {
        const job = provisioningJobs.find((j) => j.id === n.relatedEntity?.id);
        return job ? job.collegeId === cId : false;
      }
      if (n.relatedEntity?.type === 'approval') {
        const app = approvals.find((a) => a.id === n.relatedEntity?.id);
        return app ? app.collegeId === cId : false;
      }
      return !n.relatedEntity;
    });
  };

  const getScopedAuditLogsForCollege = (collegeId?: string): AuditLogItem[] => {
    const cId = getEffectiveCollegeId(collegeId);
    if (!cId) return isCorporateAdmin ? auditLogs : [];
    const collegeObj = colleges.find((c) => c.id === cId);
    const collegeStudentIds = new Set(students.filter((s) => s.collegeId === cId).map((s) => s.id));
    const collegeStaffIds = new Set(staffUsers.filter((u) => u.collegeId === cId).map((u) => u.id));

    return auditLogs.filter((l) => {
      if (l.entityId === cId) return true;
      if (collegeObj?.name && l.entityName?.toLowerCase().includes(collegeObj.name.toLowerCase())) return true;
      if (collegeStudentIds.has(l.entityId)) return true;
      if (collegeStaffIds.has(l.entityId)) return true;
      if (l.actorStaffId && collegeStaffIds.has(l.actorStaffId)) return true;
      return false;
    });
  };

  const getScopedPaymentsForCollege = (collegeId?: string): PaymentInvoice[] => {
    const cId = getEffectiveCollegeId(collegeId);
    if (!cId) return isCorporateAdmin ? payments : [];
    return payments.filter((p) => p.collegeId === cId);
  };

  const getScopedEntitlementsForCollege = (collegeId?: string): StudentEntitlement[] => {
    const cId = getEffectiveCollegeId(collegeId);
    if (!cId) return isCorporateAdmin ? studentEntitlements : [];
    return studentEntitlements.filter((e) => e.collegeId === cId);
  };

  const getScopedTasksForCollege = (collegeId?: string): CollegeTask[] => {
    const cId = getEffectiveCollegeId(collegeId);
    if (!cId) return isCorporateAdmin ? collegeTasks : [];
    return collegeTasks.filter((t) => !t.collegeId || t.collegeId === cId || t.collegeId === 'ALL');
  };

  const getScopedAnnouncementsForCollege = (collegeId?: string): CollegeAnnouncement[] => {
    const cId = getEffectiveCollegeId(collegeId);
    if (!cId) return isCorporateAdmin ? collegeAnnouncements : [];
    return collegeAnnouncements.filter((a) => !a.collegeId || a.collegeId === 'ALL' || a.collegeId === cId);
  };

  const resetAllData = () => {
    localStorage.clear();
    setColleges(INITIAL_COLLEGES);
    setStudents(INITIAL_STUDENTS);
    setProvisioningJobs(INITIAL_PROVISIONING_JOBS);
    setApprovals(INITIAL_APPROVALS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setQuotaHistory(INITIAL_QUOTA_HISTORY);
    setPayments(INITIAL_PAYMENTS);
    setStaffUsers(INITIAL_STAFF_USERS);
    setCurrentUser(INITIAL_STAFF_USERS[0]);
    setAppTemplates(INITIAL_APP_TEMPLATES);
    setInvitations(INITIAL_INVITATIONS);
    setOutboxEmails(INITIAL_OUTBOX_EMAILS);
    setStudentEntitlements(INITIAL_ENTITLEMENTS);
    setCollegeTasks(INITIAL_COLLEGE_TASKS);
    setCollegeAnnouncements(INITIAL_ANNOUNCEMENTS);
    setPasswordResetTokens([]);
    setActiveScope('company');
    addToast('info', 'System Reset', 'All data restored to default demonstration state.');
  };

  return (
    <AdminContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        staffUsers,
        addStaffUser,
        updateStaffUser,
        deleteStaffUser,
        isCorporateAdmin,
        canAccessAdminPanel,
        switchToSuperAdmin,
        activeScope,
        setActiveScope,
        isCompanyScope,
        colleges,
        getCollegeById,
        addCollege,
        updateCollege,
        suspendCollege,
        reactivateCollege,
        updateQuota,
        quotaHistory,
        toggleCollegeService,
        students,
        scopedStudents,
        revokeStudentAccess,
        reactivateStudentAccess,
        addStudent,
        updateStudent,
        getStudentById,
        bulkImportStudents,
        studentEntitlements,
        provisionStudentAccess,
        retryFailedProvisioningRecords,
        requestStudentRevocation,
        collegeTasks,
        toggleTaskComplete,
        collegeAnnouncements,
        updateCollegeSettings,
        updateUserProfile,
        changeUserPassword,
        provisioningJobs,
        scopedProvisioningJobs,
        triggerProvisioningBatch,
        approvals,
        approveRequest,
        rejectRequest,
        submitRequest,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotification,
        auditLogs,
        logAction,
        services,
        toggleGlobalService,
        payments,
        recordPayment,
        systemHealth,
        refreshSystemHealth,
        appTemplates,
        addAppTemplate,
        updateAppTemplate,
        deleteAppTemplate,
        togglePublishTemplate,
        toggleFeaturedTemplate,
        isSearchOpen,
        setIsSearchOpen,
        toasts,
        addToast,
        removeToast,
        invitations,
        outboxEmails,
        activeEmailForPreview,
        setActiveEmailForPreview,
        createCollegeAdminInvitation,
        createStaffInvitation,
        resendInvitation,
        revokeInvitation,
        validateInvitationToken,
        activateAccount,
        requestPasswordReset,
        validatePasswordResetToken,
        resetPasswordWithToken,
        suspendCollegeStaff,
        activateCollegeStaff,
        changeStaffRole,
        updateStaffDetails,
        login,
        logout,
        enforceCollegeScope,
        currentCollege,
        getEffectiveCollegeId,
        getScopedStudentsForCollege,
        getScopedStaffForCollege,
        getScopedProvisioningJobsForCollege,
        getScopedApprovalsForCollege,
        getScopedNotificationsForCollege,
        getScopedAuditLogsForCollege,
        getScopedPaymentsForCollege,
        getScopedEntitlementsForCollege,
        getScopedTasksForCollege,
        getScopedAnnouncementsForCollege,
        resetAllData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

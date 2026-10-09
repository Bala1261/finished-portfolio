import React from 'react';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { RouterProvider, useRouter } from './router/Router';
import { AdminLayout } from './components/layout/AdminLayout';
import { CollegeLayout } from './components/layout/CollegeLayout';
import { EmailPreviewModal } from './components/common/EmailPreviewModal';

// Auth Pages
import { LoginPage } from './pages/LoginPage';
import { ActivateAccountPage } from './pages/ActivateAccountPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { CorporateAccessDeniedPage } from './pages/CorporateAccessDeniedPage';

// Admin Page components
import { DashboardPage } from './pages/DashboardPage';
import { CollegesPage } from './pages/CollegesPage';
import { CollegeDetailPage } from './pages/CollegeDetailPage';
import { StudentsPage } from './pages/StudentsPage';
import { ProvisioningPage } from './pages/ProvisioningPage';
import { ServicesPage } from './pages/ServicesPage';
import { AccessControlPage } from './pages/AccessControlPage';
import { UsersPage } from './pages/UsersPage';
import { ApprovalsPage } from './pages/ApprovalsPage';
import { RequestsPage } from './pages/RequestsPage';
import { AgreementsPage } from './pages/AgreementsPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ReportsPage } from './pages/ReportsPage';
import { AuditPage } from './pages/AuditPage';
import { SystemHealthPage } from './pages/SystemHealthPage';
import { SettingsPage } from './pages/SettingsPage';
import { TemplatesPage } from './pages/TemplatesPage';

// College Portal Page components
import { CollegeDashboardPage } from './pages/college/CollegeDashboardPage';
import { CollegeStudentsPage } from './pages/college/CollegeStudentsPage';
import { CollegeStudentImportPage } from './pages/college/CollegeStudentImportPage';
import { CollegeStudentDetailPage } from './pages/college/CollegeStudentDetailPage';
import { CollegeGiveAccessPage } from './pages/college/CollegeGiveAccessPage';
import { CollegeProvisioningPage } from './pages/college/CollegeProvisioningPage';
import { CollegeServicesPage } from './pages/college/CollegeServicesPage';
import { CollegeEntitlementsPage } from './pages/college/CollegeEntitlementsPage';
import { CollegeStaffPage } from './pages/college/CollegeStaffPage';
import { CollegeAgreementPage } from './pages/college/CollegeAgreementPage';
import { CollegeProfilePage } from './pages/college/CollegeProfilePage';
import { CollegeSupportPage } from './pages/college/CollegeSupportPage';
import {
  CollegeRequestsPage,
  CollegeBillingPage,
  CollegeNotificationsPage,
  CollegeReportsPage,
  CollegeAnnouncementsPage,
  CollegeTasksPage,
  CollegeActivityPage,
  CollegeSettingsPage,
} from './pages/college/CollegeOtherPages';

const CollegeSubRoutes: React.FC = () => {
  const { path } = useRouter();

  // Match /college/students/import
  if (path === '/college/students/import' || path === '/college/bulk-import' || path === '/college/import') {
    return <CollegeStudentImportPage />;
  }

  // Match /college/students/:id (excluding import)
  if (path.startsWith('/college/students/') && path.split('/')[3] && path.split('/')[3] !== 'import') {
    return <CollegeStudentDetailPage />;
  }

  switch (path) {
    case '/college':
    case '/college/dashboard':
      return <CollegeDashboardPage />;
    case '/college/students':
      return <CollegeStudentsPage />;
    case '/college/give-access':
      return <CollegeGiveAccessPage />;
    case '/college/provisioning':
    case '/college/jobs':
      return <CollegeProvisioningPage />;
    case '/college/services':
    case '/college/quota':
      return <CollegeServicesPage />;
    case '/college/entitlements':
      return <CollegeEntitlementsPage />;
    case '/college/staff':
      return <CollegeStaffPage />;
    case '/college/agreement':
    case '/college/agreements':
      return <CollegeAgreementPage />;
    case '/college/requests':
      return <CollegeRequestsPage />;
    case '/college/billing':
      return <CollegeBillingPage />;
    case '/college/notifications':
      return <CollegeNotificationsPage />;
    case '/college/reports':
      return <CollegeReportsPage />;
    case '/college/announcements':
      return <CollegeAnnouncementsPage />;
    case '/college/tasks':
      return <CollegeTasksPage />;
    case '/college/activity':
      return <CollegeActivityPage />;
    case '/college/settings':
      return <CollegeSettingsPage />;
    case '/college/profile':
      return <CollegeProfilePage />;
    case '/college/support':
      return <CollegeSupportPage />;
    default:
      return <CollegeDashboardPage />;
  }
};

const AdminSubRoutes: React.FC = () => {
  const { path } = useRouter();

  // Match /admin/colleges/:id
  if (path.startsWith('/admin/colleges/') && path.split('/')[3]) {
    return <CollegeDetailPage />;
  }

  switch (path) {
    case '/admin':
    case '/':
      return <DashboardPage />;
    case '/admin/colleges':
      return <CollegesPage />;
    case '/admin/students':
      return <StudentsPage />;
    case '/admin/provisioning':
      return <ProvisioningPage />;
    case '/admin/services':
      return <ServicesPage />;
    case '/admin/access-control':
      return <AccessControlPage />;
    case '/admin/users':
      return <UsersPage />;
    case '/admin/approvals':
      return <ApprovalsPage />;
    case '/admin/requests':
      return <RequestsPage />;
    case '/admin/agreements':
      return <AgreementsPage />;
    case '/admin/payments':
      return <PaymentsPage />;
    case '/admin/notifications':
      return <NotificationsPage />;
    case '/admin/reports':
      return <ReportsPage />;
    case '/admin/audit':
      return <AuditPage />;
    case '/admin/system-health':
      return <SystemHealthPage />;
    case '/admin/templates':
      return <TemplatesPage />;
    case '/admin/settings':
      return <SettingsPage />;
    default:
      return <DashboardPage />;
  }
};

const AppRoutes: React.FC = () => {
  const { path } = useRouter();
  const { currentUser, isCorporateAdmin } = useAdmin();

  // 1. Standalone Authentication & Onboarding Routes
  if (path.startsWith('/login')) {
    return <LoginPage />;
  }
  if (path.startsWith('/activate-account')) {
    return <ActivateAccountPage />;
  }
  if (path.startsWith('/forgot-password')) {
    return <ForgotPasswordPage />;
  }
  if (path.startsWith('/reset-password')) {
    return <ResetPasswordPage />;
  }

  // 2. Institutional College Portal Routes
  if (path.startsWith('/college')) {
    return (
      <CollegeLayout>
        <CollegeSubRoutes />
      </CollegeLayout>
    );
  }

  // 3. Multi-Tenant Route Isolation Gate
  // College users must never access company-wide admin routes or central controls
  const isCollegeUser = !isCorporateAdmin && Boolean(currentUser.collegeId || currentUser.role.startsWith('college_'));
  if (isCollegeUser) {
    if (path === '/' || path === '') {
      return (
        <CollegeLayout>
          <CollegeSubRoutes />
        </CollegeLayout>
      );
    }
    return <CorporateAccessDeniedPage />;
  }

  // 4. Central Corporate Admin Panel Routes
  return (
    <AdminLayout>
      <AdminSubRoutes />
    </AdminLayout>
  );
};

export const AppContent: React.FC = () => {
  const { activeEmailForPreview, setActiveEmailForPreview } = useAdmin();

  return (
    <>
      <AppRoutes />

      {/* Global Interactive BEXO Email Preview Center */}
      {activeEmailForPreview && (
        <EmailPreviewModal
          isOpen={Boolean(activeEmailForPreview)}
          onClose={() => setActiveEmailForPreview(null)}
          email={activeEmailForPreview}
        />
      )}
    </>
  );
};

export const App: React.FC = () => {
  return (
    <AdminProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </AdminProvider>
  );
};

export default App;

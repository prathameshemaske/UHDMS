import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import BugTracker from './pages/BugTracker';
import Tasks from './pages/Tasks';
import Employees from './pages/Employees';
import IssueDetail from './pages/IssueDetail';
import TestCases from './pages/TestCases';
import Executions from './pages/Executions';
import Repository from './pages/Repository';
import CreateTestCase from './pages/CreateTestCase';
import EmployeeProfile from './pages/EmployeeProfile';
import AddEmployee from './pages/AddEmployee';
import Teams from './pages/Teams';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Announcements from './pages/Announcements';
import Payroll from './pages/Payroll';
import EmployeePayslips from './pages/EmployeePayslips';
import ITSupport from './pages/ITSupport';
import LeaveHistory from './pages/LeaveHistory';
import Communication from './pages/Communication';
import VideoCall from './pages/VideoCall';
import Calendar from './pages/Calendar';
import Payslip from './pages/Payslip';
import PayrollSettings from './pages/PayrollSettings';
import TaxDeclaration from './pages/TaxDeclaration';
import Compliance from './pages/Compliance';
import BonusReimbursement from './pages/BonusReimbursement';
import PayrollOverview from './pages/PayrollOverview';
import PayrollApproval from './pages/PayrollApproval';
import PayrollAnalytics from './pages/PayrollAnalytics';
import PayoutStatus from './pages/PayoutStatus';
import PayrollDataSync from './pages/PayrollDataSync';
import PayrollInputReview from './pages/PayrollInputReview';
import GlobalSettings from './pages/GlobalSettings';
import UserProfile from './pages/UserProfile';
import CompanySystemSettings from './pages/CompanySystemSettings';
import RoleGuard from './components/auth/RoleGuard';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import HRFeatures from './pages/HRFeatures';
import DevFeatures from './pages/DevFeatures';
import UnifiedAnalytics from './pages/UnifiedAnalytics';
import Pricing from './pages/Pricing';
import Solutions from './pages/Solutions';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import Resources from './pages/Resources';
import About from './pages/About';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import MyTasks from './pages/MyTasks';
import Inbox from './pages/Inbox';
import Reports from './pages/Reports';

function App() {
  return (
    <ToastProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/hr-features" element={<HRFeatures />} />
            <Route path="/dev-features" element={<DevFeatures />} />
            <Route path="/unified-analytics" element={<UnifiedAnalytics />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />

            {/* Executive Module Routes */}
            <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected App Routes */}
            <Route element={<MainLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="bugs" element={<BugTracker />} />

              {/* Public or Employee Routes */}
              <Route path="test-suites" element={<TestCases />} />
              <Route path="executions" element={<Executions />} />
              <Route path="executions/:id" element={<Executions />} />
              <Route path="repository" element={<Repository />} />
              <Route path="test-cases/create" element={<CreateTestCase />} />
              <Route path="test-cases/:id" element={<CreateTestCase />} />
              <Route path="teams" element={<Teams />} />
              <Route path="employee-dashboard" element={<EmployeeDashboard />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="communication" element={<Communication />} />
              <Route path="video-call" element={<VideoCall />} />
              <Route path="payslip-view" element={<Payslip />} />
              <Route path="tax-declaration" element={<TaxDeclaration />} />
              <Route path="bonus-reimbursement" element={<BonusReimbursement />} />
              <Route path="leave-history" element={<LeaveHistory />} />
              <Route path="it-support" element={<ITSupport />} />
              <Route path="calendar" element={<Calendar />} />

              {/* HR & Admin Only Routes */}
              <Route element={<RoleGuard allowedRoles={['hr', 'admin']} />}>
                <Route path="employees" element={<Employees />} />
                <Route path="employees/:id" element={<EmployeeProfile />} />
                <Route path="employees/add" element={<AddEmployee />} />

                {/* Payroll Management */}
                <Route path="payroll" element={<Payroll />} />
                <Route path="employee-payslips" element={<EmployeePayslips />} />
                <Route path="payroll-settings" element={<PayrollSettings />} />
                <Route path="compliance" element={<Compliance />} />
                <Route path="payroll-overview" element={<PayrollOverview />} />
                <Route path="payroll-approval" element={<PayrollApproval />} />
                <Route path="payroll-analytics" element={<PayrollAnalytics />} />
                <Route path="payout-status" element={<PayoutStatus />} />
                <Route path="payroll-data-sync" element={<PayrollDataSync />} />
                <Route path="payroll-input-review" element={<PayrollInputReview />} />
              </Route>

              {/* Reports */}
              <Route path="reports" element={<Reports />} />
            </Route>

            <Route path="/bugs/:id" element={<IssueDetail />} />
            <Route path="/settings" element={<GlobalSettings />} />
            <Route path="/settings/appearance" element={<CompanySystemSettings />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Router>
      </ToastProvider>
    </ToastProvider>
  )
}

export default App

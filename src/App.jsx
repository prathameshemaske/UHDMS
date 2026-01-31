import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import BugTracker from './pages/BugTracker';
import Tasks from './pages/Tasks';
import Employees from './pages/Employees';
import IssueDetail from './pages/IssueDetail';
import TestCases from './pages/TestCases';
import TestPlans from './pages/TestPlans';
import TestRunDetails from './pages/TestRunDetails';
import EmployeeProfile from './pages/EmployeeProfile';
import AddEmployee from './pages/AddEmployee';
import Teams from './pages/Teams';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Announcements from './pages/Announcements';
import PayrollDashboard from './pages/PayrollDashboard';
import SalaryStructure from './pages/SalaryStructure';
import PayrollAuditLog from './pages/PayrollAuditLog';
import PayrollReconciliation from './pages/PayrollReconciliation';
import StatutoryReports from './pages/StatutoryReports';
import ESIReport from './pages/ESIReport';
import TDS26Q from './pages/TDS26Q';
import Form16PartA from './pages/Form16PartA';
import SalaryHistory from './pages/SalaryHistory';
import TaxProofUpload from './pages/TaxProofUpload';
import Form16PartB from './pages/Form16PartB';
import GratuityReport from './pages/GratuityReport';
import OfferLetters from './pages/OfferLetters';
import LoansAdvances from './pages/LoansAdvances';
import FullFinalSettlement from './pages/FullFinalSettlement';
import BankTransfer from './pages/BankTransfer';

import EmployeePayslips from './pages/EmployeePayslips';
import ITSupport from './pages/ITSupport';
import LeaveHistory from './pages/LeaveHistory';
import Communication from './pages/Communication';
import VideoCall from './pages/VideoCall';
import Calendar from './pages/Calendar';
import Payslip from './pages/Payslip';

import TaxDeclaration from './pages/TaxDeclaration';
import Compliance from './pages/Compliance';
import BonusReimbursement from './pages/BonusReimbursement';

import GlobalSettings from './pages/GlobalSettings';
import Onboarding from "./pages/Onboarding";
import Offboarding from "./pages/Offboarding";
import UserProfile from './pages/UserProfile';
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
import Projects from './pages/Projects';

import { useTaskReminders } from './hooks/useTaskReminders';

import TestRunner from './pages/TestRunner';

function App() {
  useTaskReminders(); // Initialize daily reminders

  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* ... other public routes ... */}
          <Route path="/test-runner/:runId" element={<TestRunner />} />

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
            <Route path="bugs/:id" element={<IssueDetail />} />

            {/* Public or Employee Routes */}
            <Route path="test-suites" element={<TestCases />} />
            <Route path="test-plans" element={<TestPlans />} />
            <Route path="test-runs/:runId" element={<TestRunDetails />} />
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
            <Route path="loans" element={<LoansAdvances />} />
            <Route path="salary-history" element={<SalaryHistory />} />

            {/* HR & Admin Only Routes */}
            <Route element={<RoleGuard allowedRoles={['hr', 'admin']} />}>
              <Route path="employees" element={<Employees />} />
              <Route path="employees/:id" element={<EmployeeProfile />} />
              <Route path="employees/add" element={<AddEmployee />} />


              {/* Payroll Management */}
              <Route path="payroll" element={<PayrollDashboard />} />
              <Route path="salary-structure" element={<SalaryStructure />} />
              <Route path="payroll-audit" element={<PayrollAuditLog />} />
              <Route path="payroll-reconciliation" element={<PayrollReconciliation />} />
              <Route path="statutory-reports" element={<StatutoryReports />} />
              <Route path="reports/esi" element={<ESIReport />} />
              <Route path="reports/tds-26q" element={<TDS26Q />} />
              <Route path="reports/form16-part-a" element={<Form16PartA />} />

              <Route path="reports/tax-proofs" element={<TaxProofUpload />} />
              <Route path="reports/form16-part-b" element={<Form16PartB />} />
              <Route path="reports/gratuity" element={<GratuityReport />} />
              <Route path="reports/offer-letters" element={<OfferLetters />} />

              <Route path="full-final-settlement" element={<FullFinalSettlement />} />
              <Route path="bank-transfer" element={<BankTransfer />} />
              <Route path="compliance" element={<Compliance />} />

            </Route>

            <Route path="/onboarding" element={<RoleGuard allowedRoles={['hr', 'admin']}><Onboarding /></RoleGuard>} />
            <Route path="/offboarding" element={<RoleGuard allowedRoles={['hr', 'admin']}><Offboarding /></RoleGuard>} />

            {/* Fallback route */}
            <Route path="employee-payslips" element={<EmployeePayslips />} />

            {/* Reports */}
            <Route path="reports" element={<Reports />} />
            <Route path="projects" element={<Projects />} />
          </Route>


          <Route path="/settings" element={<GlobalSettings />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </ToastProvider>
  )
}

export default App

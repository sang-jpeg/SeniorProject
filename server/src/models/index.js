const { User } = require('./User');
const { Certification, TesterCertification } = require('./Certification');
const { Project, TestCycle, TestCaseExecution } = require('./Project');
const { TestCase, TestCaseTemplate, TestCaseImport } = require('./TestCase');
const { Issue, IssueComment, IssueHistory } = require('./Issue');
const { Payment, PaymentDetail, PaymentMethod } = require('./Payment');

// User Associations
User.hasMany(TesterCertification);
TesterCertification.belongsTo(User);

User.hasMany(Project, { foreignKey: 'clientId' });
Project.belongsTo(User, { as: 'client', foreignKey: 'clientId' });

User.hasMany(TestCycle, { foreignKey: 'assignedTestLead' });
TestCycle.belongsTo(User, { as: 'testLead', foreignKey: 'assignedTestLead' });

User.hasMany(TestCaseExecution, { foreignKey: 'testerId' });
TestCaseExecution.belongsTo(User, { as: 'tester', foreignKey: 'testerId' });

User.hasMany(Issue, { foreignKey: 'reporterId' });
Issue.belongsTo(User, { as: 'reporter', foreignKey: 'reporterId' });

User.hasMany(Issue, { foreignKey: 'reviewerId' });
Issue.belongsTo(User, { as: 'reviewer', foreignKey: 'reviewerId' });

User.hasMany(IssueComment);
IssueComment.belongsTo(User);

User.hasMany(Payment);
Payment.belongsTo(User);

User.hasMany(PaymentMethod);
PaymentMethod.belongsTo(User);

// Certification Associations
Certification.hasMany(TesterCertification);
TesterCertification.belongsTo(Certification);

// Project Associations
Project.hasMany(TestCycle);
TestCycle.belongsTo(Project);

Project.hasMany(TestCase);
TestCase.belongsTo(Project);

Project.hasMany(TestCaseImport);
TestCaseImport.belongsTo(Project);

// TestCycle Associations
TestCycle.hasMany(TestCaseExecution);
TestCaseExecution.belongsTo(TestCycle);

TestCycle.hasMany(Issue);
Issue.belongsTo(TestCycle);

// TestCase Associations
TestCase.hasMany(TestCaseExecution);
TestCaseExecution.belongsTo(TestCase);

TestCase.hasMany(Issue);
Issue.belongsTo(TestCase);

// Issue Associations
Issue.hasMany(IssueComment);
IssueComment.belongsTo(Issue);

Issue.hasMany(IssueHistory);
IssueHistory.belongsTo(Issue);

// Payment Associations
Payment.hasMany(PaymentDetail);
PaymentDetail.belongsTo(Payment);

TestCycle.hasMany(PaymentDetail);
PaymentDetail.belongsTo(TestCycle);

module.exports = {
  User,
  Certification,
  TesterCertification,
  Project,
  TestCycle,
  TestCaseExecution,
  TestCase,
  TestCaseTemplate,
  TestCaseImport,
  Issue,
  IssueComment,
  IssueHistory,
  Payment,
  PaymentDetail,
  PaymentMethod
}; 
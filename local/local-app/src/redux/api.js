import axios from 'axios';
import store from './store';
import {API_URL} from '../config';

const baseURL = API_URL;

export const Api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const Urls = {
  baseURL,
  login: '/login',
  register: '/register',
  // changePassword: '/secure/changePassword',
  // forgotPassword: '/auth/forgotPassword',
  // resetPassword: '/secure/resetPassword',
  // createInstructor: '/instructor',
  // getAllInstructor: '/instructor',
  // getInstructorById: '/instructor',
  // updateCustomerById: '/instructor',
  // deleteCustomerById: '/instructor',
  // deleteAllInstructor: '/instructor',
  // getAllAdminUser: '/adminList',
  // createAdminUser: '/secure/register_manual',
  // deleteAdminById: '/admin',
  // getAdminById: '/admin',
  // updateAdminById: '/admin',
  // updateStatusOfAdminById: '/admin',
  // deleteAllAdminById: '/admin',
  // orders: '/order',
  // courses: '/course',
  // sortorder: '/course/sortorder',
  // frCourseList: '/frCourseList',
  // learningmode: '/learningmode',
  // updateAllInstructorStatusById: '/instructor',
  // formLeads: '/listForm',
  // formLeadUpdate: '/lead',
  // courseCategory: '/course/category',
  // lmsCourses: 'lms/products',
  // tools: '/tools',
  // toolsAll: '/toolsAll',
  // whoShouldDo: '/whoshoulddo',
  // courseHeaders: '/courseSidebar',
  // jobRole: '/JobRoles',
  // keyskill: '/keyAllSkills',
  // keykills: '/keySkills',
  // pages: '/pages',
  // pageById: '/pageById',
  // tags: '/Tags',
  // city: '/city',
  // getAllTools: '/tools',
  // createTools: '/tools',
  // deleteToolbyId: '/tools',
  // updateStatusOfTools: '/tools',
  // getToolById: '/tools',
  // deleteAllTools: '/tools',
  // updateTools: '/tools',
  // categoryList: '/course/category',
  // categoryNameCheck: '/course/categoryName',
  // announcements: '/announcement',
  // testimonials: '/testimonial',
  // AddTestimonials: '/testimonials',
  // students: '/student',
  // studentsCSV: '/csv/student',
  // ordersCSV: '/csv/order',
  // leadsCSV: '/csv​/lead',
  // ActivitiLogsCSV: '/csv/activityLog',
  // studentAll: '/studentAll',
  // upcomingBatches: '/upcomingBatches',
  // deleteBatch: '/upcomingBatch',
  // upcomingBatchesListByCourseId: '/upcomingBatchesListByCourseId',
  // activityLog: '/activityLog',
  // offers: '/offer',
  // settings: '/setting',
  // dashboard: 'dashboard',
  // resetCache: '/clearCache',
  // deleteCareerSupport: '/deleteCareerSupport',
  // deleteCurriculumTab: '/deleteCurriculumTab',
  // deleteCarriculumItem: '/deleteCurriculumItem',
  // deleteJobRoleItem: '/deleteJobRoleItem',
  // deleteProjectTitle: '/courseCapstoneProject',
  // deleteAssignmentTitle: '/deleteAssignment',
  // deleteCertificateTitle: '/deleteCertificationTitle',
  // deleteCertificateImage: '/deleteCertificationImage',
  // deleteFAQItem: '/deleteFAQ',
  // cloneCourse: '/cloneCourse',
  // carriculumSortOrder: '/curriculumDetails',
};

Api.interceptors.request.use((config) => {
  const {
    auth: {authToken},
  } = store.getState();
  if (authToken) {
    config.headers.Authorization = `bearerAuth ${authToken}`;
  }
  return config;
});

Api.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401 && error.config.headers.Authorization) {
      window.location.replace('/401');
    }
    return Promise.reject(error);
  },
);

// controllers

var user = require('../controllers/User');
var profile = require('../controllers/Profile');
// var education = require('../controllers/Education');
// var employment = require('../controllers/Employment');
// var project = require('../controllers/Project');

module.exports = function(app) {

  app.put('/user', user.createUser);
  app.get('/user/:id', user.readOneUser);
  app.post('/user/:id', user.updateUser);
  app.del('/user/:id', user.deleteUser);
  app.get('/users/:page', user.readManyUsers);
  app.get('/users/:page/:detail', user.readManyUsers);

  app.put('/profile', profile.createProfile);
  app.get('/profile/:id', profile.readOneProfile);
  app.get('/profile/:id/:detail', profile.readOneProfile);
  app.post('/profile/:id', profile.updateProfile);
  app.del('/profile/:id', profile.deleteProfile);
  app.get('/profiles/:page', profile.readManyProfiles);
  app.get('/profiles/:page/:detail', profile.readManyProfiles);

  // app.put('/education', education.createEducation);
  // app.get('/education/:slug', education.readOneEducation);
  // //app.get('/education/:slug/:detail', education.readOneEducation);
  // app.post('/education/:id', education.updateEducation);
  // app.del('/education/:id', education.deleteEducation);
  // app.get('/educations/:page', education.readManyEducations);
  // //app.get('/educations/:page/:detail', education.readManyEducations);

  // app.put('/employment', employment.createEmployment);
  // app.get('/employment/:slug', employment.readOneEmployment);
  // app.get('/employment/:slug/:detail', employment.readOneEmployment);
  // app.post('/employment/:id', employment.updateEmployment);
  // app.del('/employment/:id', employment.deleteEmployment);
  // app.get('/employments/:page', employment.readManyEmployments);
  // app.get('/employments/:page/:detail', employment.readManyEmployments);

  // app.put('/project', project.createProject);
  // app.get('/project/:slug', project.readOneProject);
  // app.get('/project/:slug/:detail', project.readOneProject);
  // app.post('/project/:id', project.updateProject);
  // app.del('/project/:id', project.deleteProject);
  // app.get('/projects/:page', project.readManyProjects);
  // app.get('/projects/:page/:detail', project.readManyProjects);

};
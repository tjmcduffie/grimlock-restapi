// controllers

var user = require('../controllers/User');
var profile = require('../controllers/Profile');
// var education = require('../controllers/Education');
// var employment = require('../controllers/Employment');
// var project = require('../controllers/Project');

module.exports = function(app) {

  app.put('/v1/user', user.createUser);
  app.get('/v1/user/:id', user.readOneUser);
  app.post('/v1/user/:id', user.updateUser);
  app.delete('/v1/user/:id', user.deleteUser);
  app.get('/v1/users/:page', user.readManyUsers);
  app.get('/v1/users/:page/:detail', user.readManyUsers);

  app.put('/v1/profile', profile.createProfile);
  app.get('/v1/profile/:id', profile.readOneProfile);
  app.get('/v1/profile/:id/:detail', profile.readOneProfile);
  app.post('/v1/profile/:id', profile.updateProfile);
  app.delete('/v1/profile/:id', profile.deleteProfile);
  app.get('/v1/profiles/:page', profile.readManyProfiles);
  app.get('/v1/profiles/:page/:detail', profile.readManyProfiles);

  // app.put('/education', education.createEducation);
  // app.get('/education/:slug', education.readOneEducation);
  // //app.get('/education/:slug/:detail', education.readOneEducation);
  // app.post('/education/:id', education.updateEducation);
  // app.delete('/education/:id', education.deleteEducation);
  // app.get('/educations/:page', education.readManyEducations);
  // //app.get('/educations/:page/:detail', education.readManyEducations);

  // app.put('/employment', employment.createEmployment);
  // app.get('/employment/:slug', employment.readOneEmployment);
  // app.get('/employment/:slug/:detail', employment.readOneEmployment);
  // app.post('/employment/:id', employment.updateEmployment);
  // app.delete('/employment/:id', employment.deleteEmployment);
  // app.get('/employments/:page', employment.readManyEmployments);
  // app.get('/employments/:page/:detail', employment.readManyEmployments);

  // app.put('/project', project.createProject);
  // app.get('/project/:slug', project.readOneProject);
  // app.get('/project/:slug/:detail', project.readOneProject);
  // app.post('/project/:id', project.updateProject);
  // app.delete('/project/:id', project.deleteProject);
  // app.get('/projects/:page', project.readManyProjects);
  // app.get('/projects/:page/:detail', project.readManyProjects);

};
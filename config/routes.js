// controllers

var user = require(process.cwd() + '/controllers/User');
var profile = require(process.cwd() + '/controllers/Profile');
// var education = require(process.cwd() + '/controllers/Education');
// var employment = require(process.cwd() + '/controllers/Employment');
// var project = require(process.cwd() + '/controllers/Project');

module.exports = function(app) {

  app.put('/user', user.createUser);
  app.get('/user/:id', user.readOneUser);
  app.get('/user/:id/:detail', user.readOneUser);
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
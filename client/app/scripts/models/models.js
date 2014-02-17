(function () {
	'use strict';

	var cidCounter = 0;

	var idMod = stampit().enclose(function () {
		var cid = cidCounter++,
			id = null;

		this.getClientId = function () {
			return cid;
		};

		this.getId = function () {
			return id;
		};

		this.setId = function (_id) {
			if (!_.isNull(id)) {
				throw new Error('Id already exist.');
			}

			if (_id && _.isNull(id)) {
				id = _id;
			}
		};

		this.isNew = function () {
			return _.isNull(id);
		}
	});

	var userMod = stampit().state({
		firstName: null,
		lastName: null,
		birthday: null,
		email: null
	});

	var processMod = stampit().state({
		title: null,
		description: null,
		status: 1,
		priority: 1,
		startDate: null,
		endDate: null,
		duration: 0,
		progress: 0
	});

	var effortMod = stampit().enclose(function () {
		var taskId = null;

		this.getTaskId = function () {
			return taskId;
		};

		this.setTaskId = function (_taskId) {
			taskId = _taskId;
		}
	}).state({
		date: null,
		comment: null,
		activity: null
	}).methods({
		getUrl: function () {
			if (this.isNew()) {
				return '/' + this.getTaskId() + '/efforts';
			}
			return '/' + this.getTaskId() + '/efforts/' + this.getId();
		}
	});

	window.factory = {};

	factory.user = stampit.compose(idMod, userMod).methods({
		getUrl: function () {
			if (this.isNew()) {
				return '/users';
			}
			return '/users/' + this.getId();
		},

		isValid: function () {
			var validFirstName = !_.isNull(this.firstName),
				validLastName = !_.isNull(this.lastName),
				validBirthday = !_.isNull(this.birthday),
				validEmail = !_.isNull(this.email);

			return validFirstName && validLastName && validBirthday && validEmail;
		}
	});

	factory.task = stampit.compose(idMod, processMod).methods({
		getUrl: function () {
			if (this.isNew()) {
				return '/tasks';
			}
			return '/tasks/' + this.getId();
		}
	});

	factory.project = stampit.compose(idMod, processMod).methods({
		getUrl: function () {
			if (this.isNew()) {
				return '/projects';
			}
			return '/projects/' + this.getId();
		}
	});

	factory.effort = stampit.compose(idMod, effortMod);

}());
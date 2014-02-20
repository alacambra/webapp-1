(function () {
	'use strict';

	/*
	 -------------------- MODS --------------------
	 */

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
	}).methods({
		getFullName: function () {
			return this.firstName + ' ' + this.lastName;
		}
	});

	var processMod = stampit().state({
		title: null,
		description: null,
		status: 1,
		priority: 1,
		startDate: null,
		endDate: null,
		duration: 0,
		effort: 0,
		progress: 0,
		assignee: null
	}).methods({
		statusList: [
			'todo',
			'new',
			'assigned',
			'on hold',
			'completed',
			'archived',
			'requested',
			'offered'
		],

		getStatus: function () {
			return this.statusList[this.status];
		}
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

	/*
	 -------------------- FACTORIES --------------------
	 */

	window.factory = {};

	/**
	 * Factory that produces user instances.
	 */
	factory.user = stampit.compose(idMod, userMod).methods({
		isValid: function () {
			var validFirstName = !_.isNull(this.firstName),
				validLastName = !_.isNull(this.lastName),
				validBirthday = !_.isNull(this.birthday),
				validEmail = this.email && this.email.search(/^.+@.+\.\w+$/) === 0;

			return validFirstName && validLastName && validBirthday && validEmail;
		}
	});

	/**
	 * Factory that produces task instances.
	 */
	factory.task = stampit.compose(idMod, processMod).enclose(function () {
		var project = null;

		this.setProject = function (_project) {
			if (_project) {
				project = {
					id: _project.getId(),
					name: _project.title
				};

			} else {
				project = null;
			}
		};

		this.getProject = function () {
			return project;
		};

	}).methods({
		clearProject: function () {
			this.setProject(null);
		},

		hasProject: function () {
			return !_.isNull(this.getProject());
		}
	});

	/**
	 * Factory that produces project instances.
	 */
	factory.project = stampit.compose(idMod, processMod).enclose(function () {
		var tasks = [];

		this.getTasks = function () {
			return tasks;
		};

		this.addTask = function (task) {
			tasks.push(task);
		};

		this.removeTask = function (task) {
			var index = tasks.indexOf(task);
			tasks.splice(index, 1);
		};

		this.setTasks = function (_tasks) {
			tasks = _tasks;
		};

		this.clearTasks = function () {
			tasks = [];
		};

		this.hasTasks = function () {
			return tasks.length > 0;
		}

	}).methods({
		getUrl: function () {
			if (this.isNew()) {
				return '/projects';
			}
			return '/projects/' + this.getId();
		}
	});

	/**
	 * Factory that produces effort instances.
	 */
	factory.effort = stampit.compose(idMod, effortMod);

}());
(function () {
	'use strict';

	var convertDate = function convertDate (date) {
		if (date <= -99999999999999 || date >= 99999999999999) {
			return null;
		}
		return date;
	};

	var reconvertDate = function reconvertDate (date) {
		if (_.isNull(date)) {
			return 99999999999999;
		}
		return date;
	};

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
		},

		getRequestObj: function () {
			var requestObj = _.extend({}, this);
			requestObj.birthday = reconvertDate(requestObj.birthday);
			return requestObj;
		}
	});

	var processMod = stampit().state({
		title: null,
		description: null,
		status: 'new',
		priority: 'normal',
		startDate: null,
		endDate: null,
		duration: 0,
		effort: 0,
		progress: 0,
		assignee: null
	}).methods({
		statusList: {
			'TODO': 'todo',
			'NEW': 'new',
			'ASSIGNED': 'assigned',
			'ON HOLD': 'on hold',
			'COMPLETED': 'completed',
			'ARCHIVED': 'archived',
			'REQUESTED': 'requested',
			'OFFERED': 'offered'
		},

		priorityList: [
			'low',
			'normal',
			'high'
		],

		getRequestObj: function () {
			var requestObj = _.extend({}, this);
			requestObj.startDate = reconvertDate(requestObj.startDate);
			requestObj.endDate = reconvertDate(requestObj.endDate);
			return requestObj;
		}
	});

	var taskMod = stampit().enclose(function () {
		var _efforts = [];

		this.getEfforts = function () {
			return _efforts;
		};

		this.setEfforts = function (efforts) {
			_efforts = efforts;
		};

	}).methods({
		getEffort: function (effortId) {
			for (var i = 0; i < this.getEfforts().length; i++) {
				if (this.getEfforts()[i].getId() === effortId) {
					return this.getEfforts()[i];
				}
			}
			return null;
		},

		addEffort: function (effort) {
			this.getEfforts().push(effort);
		},

		removeEffort: function (effort) {
			for (var i = 0; i < this.getEfforts().length; i++) {
				if (this.getEfforts()[i] === effort) {
					this.getEfforts().splice(i, 1);
				}
			}
		}
	});

	var effortMod = stampit().state({
		date: null,
		time: null,
		comment: null,
		taskId: null
	}).methods({
		getRequestObj: function () {
			var requestObj = _.extend({}, this);
			requestObj.date = reconvertDate(date);
			return requestObj;
		}
	});

	/*
	 -------------------- FACTORIES --------------------
	 */

	window.factory = {};

	/**
	 * Factory that produces user instances.
	 */
	var user = stampit.compose(idMod, userMod).methods({
		isUser: true,

		isValid: function () {
			var validFirstName = !_.isNull(this.firstName),
				validLastName = !_.isNull(this.lastName),
				validBirthday = !_.isNull(this.birthday),
				validEmail = this.email && this.email.search(/^.+@.+\.\w+$/) === 0;

			return validFirstName && validLastName && validBirthday && validEmail;
		}
	});

	factory.user = function (data, options) {
		data.birthday = convertDate(data.birthday);
		return user(data);
	};

	/**
	 * Factory that produces task instances.
	 */
	var task = stampit.compose(idMod, taskMod, processMod).state({
		project: null
	}).methods({
		isTask: true,

		setProject: function (project) {
			this.project = {
				id: project.getId(),
				name: project.title
			};
		}
	});

	factory.task = function (data, options) {
		data.startDate = convertDate(data.startDate);
		data.endDate = convertDate(data.endDate);
		return task(data);
	};

	/**
	 * Factory that produces project instances.
	 */
	var project = stampit.compose(idMod, processMod).enclose(function () {
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
		isProject: true,

		getUrl: function () {
			if (this.isNew()) {
				return '/projects';
			}
			return '/projects/' + this.getId();
		}
	});

	factory.project = function (data, options) {
		data.startDate = convertDate(data.startDate);
		data.endDate = convertDate(data.endDate);
		return project(data);
	};

	/**
	 * Factory that produces effort instances.
	 */
	var effort = stampit.compose(idMod, effortMod);

	factory.effort = function (data, options) {
		data.date = convertDate(data.date);
		return effort(data);
	};

}());
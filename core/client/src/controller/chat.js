imifyApp.controller('chatCtrl', function ($scope, socket) {
  $scope.name = '';
  $scope.users = [];
  $scope.message = '';
  $scope.messages = [];

  socket.on('init', function (data) {
    $scope.users = data.users;
  });

  socket.on('send:message', function (message) {
    message.type = ($scope.name === message.user) ? 'to' : 'from';
    $scope.messages.push(message);
  });

  socket.on('change:name', function (data) {
    renameUser(data.oldName, data.newName);
  });

  socket.on('user:join', function (data) {
    $scope.messages.push({
      type: 'system',
      text: data.name + ' has joined.'
    });

    $scope.users.push(data.name);
  });

  socket.on('user:left', function (data) {
    $scope.messages.push({
      type: 'system',
      text: data.name + ' has left.'
    });
  });

  var renameUser = function (oldName, newName) {
    var index = $scope.users.indexOf(oldName);
    $scope.users[index] = newName;
  };

  $scope.setName = function () {
    var data = { name: $scope.newName };
    $scope.name = $scope.newName;
    $scope.newName = '';
    socket.emit('user:join', data);
  };

  $scope.sendMessage = function () {
    var data = {
      user: $scope.name,
      text: $scope.message
    };

    socket.emit('send:message', data);
    data.type = 'to';
    $scope.messages.push(data);
    $scope.message = '';
  };
});

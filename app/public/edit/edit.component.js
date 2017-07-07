(function() {
  'use strict';
  angular.module("app").component("edit", {
    controller: editController,
    templateUrl: "edit/edit.template.html"
  });



  editController.$inject = ["$http", '$stateParams', '$state'];
  function editController($http, $stateParams, $state){
    const vm = this;
    vm.whatID = function(id){
      console.log(id);
    };


    vm.$onInit = function(){
      console.log($stateParams.id);
      var id = $stateParams.id;
      $http.get('api/posts/' + id ).then(function(response){
        console.log("post request for edit", response.data);
        vm.editPost = response.data
      }).catch(function(err){
        console.log(err);
      });
    };

    vm.editPostFunction = function(){
          $http.patch(`api/posts/${$stateParams.id}`, vm.editPost).then(function(response){                                  //this function posts, then grabs the coments to apppend but a new post doesnt have comments, (dont need to do a request for comments)
            $state.go('main');
          });
        };
  }
})();

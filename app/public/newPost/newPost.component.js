(function() {
  'use strict';
  angular.module("app").component("newPost", {
    controller: donkey,
    templateUrl: "newPost/newPost.template.html"
  });



  donkey.$inject = ["$http"];
  function donkey($http){
    const vm = this;
    vm.whatID = function(id){
      console.log(id);
    };


    vm.$onInit = function(){
      $http.get('api/posts').then(function (response) {
        for(let i=0; i<response.data.length; i++){
          vm.posts.push(response.data[i]);
        }
      }).catch(function(err){
        console.log(err);
      });

      

      for(var i=4; i<20; i++){
        $http.delete('api/posts/' +i ).then(function(response){  //this function deletes any entry i personally made from the database
        }).catch(function(err){
          console.log(err);
        });
      }
      vm.sortWord = "Votes";
      vm.by = 'Votes';

      vm.show = false;
      vm.posts = [];
      vm.showComment =false;
    };

    // vm.redirect = function(post){
    //   $state.go()
    // }

    vm.createNewPost = function(){
      vm.newPost.created_at = new Date();
      // vm.newPost.numComments = 0;
      vm.newPost.comments = [];
      vm.newPost.vote_count = 0;                    //
      // vm.newPost.showComments = false;
      // vm.newPost.newComment = '';

      // $http.post('api/posts', vm.newPost).then(function(response){                                  //this function posts, then grabs the coments to apppend but a new post doesnt have comments, (dont need to do a request for comments)
      //   $http.get('api/posts/' + response.data.id + '/comments').then(function(result){
      //     console.log(response, "response");
      //     console.log("comment result", result.data);
      //   });
      // })

      $http.post('api/posts', vm.newPost).then(function(response){                                  //this function posts, then grabs the coments to apppend but a new post doesnt have comments, (dont need to do a request for comments)
        console.log(response);
        response.data.showComments = false;
        response.data.newComment = '';
        response.data.comments = [];
        vm.posts.push(response.data);
        console.log(vm.posts);
      }).catch(function(err){
        console.log(err);
      });
      vm.show = false;
      vm.newPostForm.$setPristine();
      vm.newPost = angular.copy(vm.master);         // wtf is this line doing
      vm.newPostForm.$setUntouched();
    };
    vm.postComment = function(post){
      $http.post('api/posts/' + post.id + '/comments', {content: post.newComment}).then(function(result){
        post.comments.push(result.data);
      }).catch(function(err){
        console.log(err);
      });
      delete post.newComment;
    };

    vm.upvote = function(post){
      post.vote_count ++;
    };
    vm.downvote = function(post){
      if(post.vote_count >0){
        post.vote_count --;
      }
    };
    vm.showComments = function(post){
      post.showComments = !post.showComments;
    };
    vm.sortBy = function(bywhat){
      if(bywhat == "votes"){
        vm.sortWord = "Votes"                   //sortword is just to append to the button
      }
      else{
        vm.sortWord = bywhat;
      }
      vm.by = bywhat
      if(bywhat == "title"){
        vm.by = "title";                        //vm.by is the slightly different format for the orderby thing
      }
      else if(bywhat == "Votes"){
        vm.by = "-votes";
      }
      else if(bywhat == "body"){
        vm.by = "Body";
      }
    };
    vm.sorting = function(){
    }
  }
})();

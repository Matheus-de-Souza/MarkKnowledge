angular
	.module('app')
	.controller('FileListCtrl', FileListCtrl);

FileListCtrl.$inject = ['$http', '$log'];

function FileListCtrl ($http, $log) {

	var vm = this;
	vm.init            = init;
	vm.showFileContent = showFileContent;

	vm.init ();
	
	function init () {

		$http({
			method: 'GET',
			url: '/list-files'
		}).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available

			vm.files = response.data.files;

			//itera pela lista de arquivos e escolhe o primeiro
			angular.forEach(vm.files,
							function(value, key) {
								if (vm.selectedFilePath === undefined) {
									vm.selectedFilePath = key + '/' + value[0];
								}
							});
			
		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	};

	function showFileContent (dirname, filename) {
		$log.log("dirname: ", dirname, 'filename: ', filename);
		vm.selectedFilePath = dirname + '/' + filename;
	}
};

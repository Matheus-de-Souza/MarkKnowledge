angular
	.module('app')
	.controller('FileListCtrl', FileListCtrl);

FileListCtrl.$inject = ['$http', '$filter', '$log'];

function FileListCtrl ($http, $filter, $log) {

	var vm = this;
	vm.init            = init;
	vm.showFileContent = showFileContent;

	vm.init ();
	
	function init () {

		$http({
			method: 'GET',
			url: '/list-files'
		}).then(function successCallback(response) {

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

		$http({
			method: 'POST',
			url: '/show-file-contents',
			data: { file: dirname + '/' + filename }
		}).then(function successCallback(response) {
			$log.log('response', response.data);
			vm.file = response.data.file;
		});
	}
};

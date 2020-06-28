/**
 * @fileoverview axios interceptor used to check the response of the API.
 * if ok then nothing happens, if an error occurs then a error modal will appear.
 * Used on all pages.
 * @author Tom Jones <tom@wilson-express.co.uk>
 */
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  $("#loader").addClass("hide-loader");
  $("#error").modal("show");
  console.error(error);
  return Promise.reject(error);
});
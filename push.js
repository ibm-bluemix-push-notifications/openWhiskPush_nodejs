/**
 *
 * main() will be invoked when you Run This Action.
 * 
 * @param OpenWhisk actions accept a single parameter,
 *        which must be a JSON object.
 *
 * In this case, the params variable will look like:
 *     { "message": "xxxx" }
 *
 * @return which must be a JSON object.
 *         It will be the output of this action.
 *
 */
/**
 *
 * main() will be invoked when you Run This Action.
 * 
 * @param OpenWhisk actions accept a single parameter,
 *        which must be a JSON object.
 *
 * In this case, the params variable will look like:
 *     { "message": "xxxx" }
 *
 * @return which must be a JSON object.
 *         It will be the output of this action.
 *
 */
var openwhisk = require('openwhisk')

function main(params) {


  var message = params.value + " This is a message for deviceid " + params.deviceId;
  var deviceID = params.deviceId;

  var wsk = openwhisk()
  var promise = new Promise(function (resolve, reject) {

    var devid = [deviceID]
    var tags = ["tagsName"]

    wsk.actions.invoke({
      actionName: "/whisk.system/pushnotifications/sendMessage",
      params: {
        "appSecret": "appSecret",
        "appId": "appId",
        "text": message,
        "deviceIds": devid,
        "tagNames": tags
      }
    }).then(result => {
      console.log('Message Send to device', result)
      resolve(result);
    }).catch(err => {
      console.error('failed to Send message', err)
      reject(err);
    });
  });
  return promise;

}
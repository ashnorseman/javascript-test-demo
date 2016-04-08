/**
 * Created by AshZhang on 2016-4-8.
 */


var context = require.context('../src', true, /-test\.js$/);
context.keys().forEach(context);

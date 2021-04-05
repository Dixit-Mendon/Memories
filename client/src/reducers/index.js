import { combineReducers } from 'redux';

import posts from './posts';

export default combineReducers({
    posts,  //posts:posts since same so we can simply use posts
});
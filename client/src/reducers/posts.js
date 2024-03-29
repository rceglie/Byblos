export default (state = {posts: []}, action) => {
    switch (action.type){
        case 'FETCH_ALL':
            return { ...state, posts: action.payload}
        case 'CREATE':
            return { ...state, posts: [...state.posts, action.payload] };
        case 'UPDATE':
            return { ...state, posts: state.posts.map((post) => (post._id == action.payload._id ? action.payload : post)) };
        case 'DELETE':
            return { ...state, posts: state.posts.filter((post) => post._id != action.payload) };
        case 'FETCH_BY_USER':
            return { ...state, posts: action.payload };
        case 'FETCH_POST':
            return { ...state, post: action.payload };
        default:
            return state;
    }
}
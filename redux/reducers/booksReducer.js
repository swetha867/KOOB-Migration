const INITIAL_STATE = {
    books:[]
};

   
    
    const booksReducer =(state = INITIAL_STATE,action) =>{
        switch(action.type){
            case 'ADD_BOOKS': {
                // let itemIndex = state.findIndex(({ item }) => action.payload.url === item.url);
			// if (itemIndex > -1) {
                return Object.assign({}, state, {
                    books: state.books.concat({
                      url: action.payload.url,
                      book_name:action.payload.book_name
                    })
                  })
               // return state.books.concat([action.payload]);

			
                
                

            }
            case 'REMOVE_BOOKS': {
                let newState = [...state];
			    newState.splice(action.payload, 1);
			    return newState;
            }
            default:
                return state;
        }
    };
    export default booksReducer;
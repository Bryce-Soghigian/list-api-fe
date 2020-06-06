const initialState = {
  isAuthenticated: false,
  username: null,
  user: null,
  UPDATE_ITEM: null,
  userList: null,
  friendMessage: "",
  friendsList: null,
  currentFriendAnimeList: null,
  getCurrentFriendName: null,
  watchList: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "fetchWatch":
      return {
        ...state,
        watchList: action.payload,
      };
    case "SIGNUP":
      return {
        ...state,
      };
    case "LOGIN":
      localStorage.setItem("user_id", JSON.stringify(action.payload.user_id));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        username: action.payload.username,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        isAuthenticated: true,
        UPDATE_ITEM: action.payload,
      };
    case "tier-update":
      return {
        ...state,
        current_tier: action.payload.toString(),
      };
    case "genre_update":
      return {
        ...state,
        current_genre: action.payload,
      };
    case "fetching_user_data":
      return {
        ...state,
        userList: action.payload,
      };
    case "send_friend_request":
      return {
        ...state,
        friendMessage: action.payload,
      };
    case "fetch_users_friends":
      return {
        ...state,
        friendsList: action.payload,
      };
    case "setCurrentFriend":
      console.log(action.payload, "current friends anime list");
      let mapArray = action.payload;
      let S = [];
      let A = [];
      let B = [];
      let C = [];
      let D = [];
      let F = [];
      mapArray.map((item) => {
        if (item.rating === "S") {
          S.push(item);
        }
        if (item.rating === "A") {
          A.push(item);
        }
        if (item.rating === "B") {
          B.push(item);
        }
        if (item.rating === "C") {
          C.push(item);
        }
        if (item.rating === "D") {
          D.push(item);
        }
        if (item.rating === "F") {
          F.push(item);
        }
      });
      let newState = S.concat(A, B, C, D, F);
      return {
        ...state,
        currentFriendAnimeList: newState,
      };
    case "setCurrentFriendUsername":
      return {
        ...state,
        getCurrentFriendName: action.payload,
      };
    case "myWatchList":
      return {
        ...state,
        watchList: action.payload,
      };
    default:
      return state;
  }
};

module.exports = { reducer, initialState };

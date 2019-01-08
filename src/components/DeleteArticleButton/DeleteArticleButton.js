import React from 'react';
import { connect } from 'react-redux';

const DeleteArticleButton = (props) => (
  <button
    onClick={() => props.dispatch({ 
      type: 'DELETE_ARTICLE',
      payload: props.postId 
    })}
  >
    Delete
  </button>
);

// class DeleteArticleButton extends Component {
//   // delete handle click
//   handleDelete = (id) => {
//     console.log('in handle delete', id);

//     this.props.dispatch({
//       type: 'DELETE_ARTICLE',
//       payload: id
//     })
//   }
//   render() {
//     return (
//       <div>
//         <div>
//           <h1 id="welcome">
//             Welcome, {this.props.user.full_name}!
//           </h1>
//           <img
//             src={this.props.user.img_avatar}
//             alt={this.props.user.username}
//           />
//           <p>Your ID is: {this.props.user.id}</p>
//           <LogOutButton className="log-in" />
//         </div>
//         <div>
//           <h1>Subscription Feed</h1>
//           {this.props.subscription.map(userBlog => {
//             return (
//               <div key={userBlog.id}>
//                 <h3>{userBlog.full_name}</h3>
//                 <p>{userBlog.description}</p>
//                 <button onClick={() => this.handleUnfollow(userBlog.sub_blog_id)}>Unfollow</button>
//               </div>
//             )
//           })}
//         </div>
//         <div>
//           <h1>My Articles</h1>
//           {this.props.blog.map(post => {
//             return (
//               <div key={post.id}>
//                 <h2>{post.title}</h2>
//                 <img
//                   alt=""
//                   src={post.img_header}
//                   width="100"
//                   height="100"
//                 />
//                 <p>{post.date}</p>
//                 <p>Category: {post.name}</p>
//                 <button onClick={() => this.handleEdit(post.id)}>Edit</button>
//                 <button onClick={() => this.handleDelete(post.id)}>Delete</button>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     )
//   }
// }

// this allows us to use <App /> in index.js
export default connect()(DeleteArticleButton);

import React from 'react'
import post from "../assests/post/image_01.jpg";
import { useSelector } from 'react-redux'
function Home() {
    const { token } = useSelector((state) => ({
        token: state.authentication.token,
    }))
    return (
        <div className="data">
            <div id="content_panel">
                <div id="content_right" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <div className="post_section">
                        <div className="date_section"> 14<span>OCT</span> </div>
                        <div className="post_content">
                            <div className="post_title">
                                <h1>Post Title Two goes here</h1>
                                <div className="post_info"> Posted by <a href="#">Suspendisse potenti</a> | <a href="#">Photo Gallery</a> | <a href="#"><span className="comment">8 comments.</span></a> </div>
                            </div>
                            <div className="post_body"> <img src={post} alt="" />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec dui. Donec nec neque ut quam sodales feugiat. Nam vehicula dapibus lectus. Integer imperdiet pretium dolor. Vivamus felis. Vivamus vulputate vehicula mi. Maecenas consectetur purus. Aliquam tristique lacus in sapien. Suspendisse potenti. Ut sed pede. Nullam vitae tellus. Sed ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                            </div>
                            {token && (
                                <div className="leave_comment_section">
                                    <div className="leave_comment_section_title">Leave a Comment</div>
                                    <form>
                                        <div className="form_row">
                                            <label>
                                                Email
                                </label><br />
                                            <input type="text" name="fullname" id="fullname"></input>
                                        </div>
                                        <div className="form_row">
                                            <label>
                                                Your comment
                                </label><br />
                                            <textarea name="comment"></textarea>
                                        </div>
                                        <input type="submit" name="Submit" value="Submit" class="submit_btn"></input>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="cleaner_with_height">&nbsp;</div>

                </div>
                <div className="cleaner_with_height">&nbsp;</div>
            </div>
        </div>
    )
}

export default Home

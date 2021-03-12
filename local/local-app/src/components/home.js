import React from 'react'
import { useSelector } from 'react-redux'
import { API_URL } from "../config"
import moment from "moment"
function Home() {
    const { token, blog } = useSelector((state) => ({
        token: state.authentication.token,
        blog: state.authentication.blog
    }))
    return (
        <div className="data">
            <div id="content_panel">
                <div id="content_right" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    {blog && blog.length > 0 ? blog.map((element) => (
                        <div className="post_section">
                            {element.isHome && (
                                <>
                                    <div className="date_section"> {element.createdAt.split("T")[0].split("-")[2]}<span>{moment.months()[element.createdAt.split("T")[0].split("-")[1].split("0")[1] - 1]}</span> </div>
                                    <div className="post_content">
                                        <div className="post_title">
                                            <h1>{element.tittle}</h1>
                                            <div className="post_info"> Posted by <a href="/">Suspendisse potenti</a> | <a href="/">Photo Gallery</a> | <a href="/"><span className="comment">8 comments.</span></a> </div>
                                        </div>
                                        <div className="post_body"> <img src={`${API_URL}${element.blogImage}`} alt="" width="460px" height="380px"/>
                                            {element.description}
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
                                </>
                            )}
                            {/* {console.log(element.isHome)} */}
                        </div>

                    )) : ''}
                    <div className="cleaner_with_height">&nbsp;</div>

                </div>
                <div className="cleaner_with_height">&nbsp;</div>
            </div>
        </div>
    )
}

export default Home

import React from 'react'
import { useSelector} from 'react-redux'
import moment from "moment"
import HomeData from "./homeData"
function Home() {
    const { blog } = useSelector((state) => ({
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
                                    <HomeData
                                        element={element}
                                    />
                                </>
                            )}
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

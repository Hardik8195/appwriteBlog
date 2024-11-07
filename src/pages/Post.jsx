import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-gray-50">
            <Container>
                <div className="w-full flex justify-center mb-8 relative border border-gray-300 rounded-xl overflow-hidden shadow-lg">
                    <div className="w-full md:w-1/2 px-6 py-8">
                        <h1 className="text-3xl font-semibold text-gray-900 mb-4">{post.title}</h1>
                        <div className="text-gray-700 text-lg mb-4">
                            {parse(post.content)}
                        </div>

                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="text-white">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost} className="text-white">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="w-full md:w-1/2">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover rounded-tr-xl rounded-br-xl"
                        />
                    </div>
                </div>
            </Container>
        </div>
    ) : (
        <div className="text-center py-10">Loading...</div>
    );
}

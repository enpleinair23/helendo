import PropTypes from 'prop-types';
import BlogWithSidebar from '../../../components/Blogs/BlogWithSidebar';
import FooterComps from '../../../components/FooterComps';
import HeaderOne from '../../../components/HeaderComps';
import { getBlogTags } from '../../../lib/BlogTags';
import { getBlogCategories } from '../../../lib/BlogCategories';
import { getAllItems } from '../../../lib/ItemsUtil';

function BlogTagPage({ headerItems, blogs, categories, tags, footerItems }) {
    return (
        <>
            <HeaderOne headerItems={headerItems} headerContainer="container" />
            <BlogWithSidebar
                blogs={blogs}
                categories={categories}
                tags={tags}
            />
            <FooterComps
                breadcrumbContainer="container"
                footerItems={footerItems}
            />
        </>
    );
}

export const getStaticProps = ({ params }) => {
    const { slug } = params;
    const headerItems = getAllItems('header');
    const blogs = getAllItems('blogs');
    const filteredblogs = blogs
        .map((blog) => ({
            ...blog,
            uniqueTag: blog.tag.find((tag) => tag === slug),
        }))
        .filter((blog) => blog.uniqueTag === slug);
    const categories = getBlogCategories();
    const tags = getBlogTags();
    const footerItems = getAllItems('footer');

    return {
        props: {
            headerItems,
            blogs: filteredblogs,
            categories,
            tags,
            footerItems,
        },
    };
};

export const getStaticPaths = () => {
    const tags = getBlogTags();

    return {
        paths: tags.map((tag) => ({
            params: { slug: tag },
        })),
        fallback: false,
    };
};

BlogTagPage.propTypes = {
    headerItems: PropTypes.instanceOf(Object).isRequired,
    blogs: PropTypes.instanceOf(Object).isRequired,
    categories: PropTypes.instanceOf(Object).isRequired,
    tags: PropTypes.instanceOf(Object).isRequired,
    footerItems: PropTypes.instanceOf(Object).isRequired,
};

export default BlogTagPage;
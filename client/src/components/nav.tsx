import './nav.css';
import "rc-tree/assets/index.css"
import { useNavigate } from "react-router-dom";

import * as React from 'react';
import Tree from 'rc-tree';

import { AppContext } from '../context/appContext';

const Nav = ({ sites, content }) => {

    const appContext: any = React.useContext(AppContext);

    const navigate = useNavigate();
    const [treeData, setTreeData] = React.useState<any>();

    React.useEffect(() => {

        const siteTree = sites.map((site) => {
            const s = site;
            const dom = site.pages.map((page) => {
                return { key: `/page/${s.id}/${page.id}`, title: page.title }
            })
            return { key: `/site/${s.id}`, title: s.name, children: dom }
        })

        const contentTree = content.map((content) => {
            return { key: `/content/${content.id}`, title: content.id }
        })

        const tree = [{
            key: "root/data",
            title: "Data",
            children: [{
                key: "root/site",
                title: "Sites",
                children: siteTree
            },
            {
                key: "root/content",
                title: "Content",
                children: contentTree
            }]
        }]

        setTreeData(tree);

    }, [sites, content]);

    const onSelect = (value) => {
        navigate(value[0], { replace: true });
    }

    return (<div className="nav-container">
        <div className="nav">
            <Tree
                className="nav-tree"
                showLine={true}
                checkable={false}
                selectable={true}
                defaultExpandAll={true}
                onSelect={onSelect}
                treeData={treeData}
            />
        </div>
        <div className="save-button">
            <button onClick={()=> appContext.persist()}>Persist to disk</button>
        </div>
    </div>
    )
}

export default Nav;

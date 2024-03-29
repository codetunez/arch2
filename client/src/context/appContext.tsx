import * as React from 'react';
import axios from 'axios';
import * as library from 'library';

export const AppContext = React.createContext({});

export class AppProvider extends React.PureComponent<any, any> {

    constructor(props) {
        super(props);

        let siteData = null;
        let contentData = null;
        axios('http://localhost:3001/api/sites')
            .then((res: any) => {
                siteData = res.data;
                return axios('http://localhost:3001/api/content')
            })
            .then((res: any) => {
                contentData = res.data;
                return axios('http://localhost:3001/api/data')
            })
            .then((res: any) => {
                this.setState({
                    sites: siteData,
                    content: contentData,
                    data: res.data,
                    engines: library.list.engines.map((ele) => { return { "name": ele, "value": ele } }),
                    forms: library.list.forms.map((ele) => { return { "name": ele, "value": ele } }),
                    refreshRuntime: false
                });
            })
    }

    runtimeRefresh = async () => {
        await axios.post('http://localhost:3002/api/reload', {});
        this.setState({ refreshRuntime: false });
    }

    persist = async () => {
        const res: any = await axios.post(`http://localhost:3001/api/persist`, {});
        this.setState({ sites: res.data.sites, content: res.data.content, data: res.data.data, refreshRuntime: true })
    }

    // page

    updatePage = async (site, page, payload) => {
        const res: any = await axios.post(`http://localhost:3001/api/page/${site}/${page}`, payload);
        this.setState({ sites: res.data.sites, refreshRuntime: true })
    }

    addPage = async (site) => {
        const res: any = await axios.post(`http://localhost:3001/api/page/new`, { siteId: site });
        this.setState({ sites: res.data.sites, refreshRuntime: true })
    }

    deletePage = async (site, page) => {
        const res: any = await axios.delete(`http://localhost:3001/api/page/${site}/${page}`, {});
        this.setState({ sites: res.data.sites, content: res.data.content, refreshRuntime: true })
    }

    // content

    updateContent = async (content, payload) => {
        const res: any = await axios.post(`http://localhost:3001/api/content/${content}`, payload);
        this.setState({ sites: res.data.sites, refreshRuntime: true })
    }

    addContent = async () => {
        const res: any = await axios.post(`http://localhost:3001/api/content/new`, {});
        this.setState({ content: res.data.content, refreshRuntime: true })
    }

    deleteContent = async (content) => {
        const res: any = await axios.delete(`http://localhost:3001/api/content/${content}`, {});
        this.setState({ sites: res.data.sites, content: res.data.content, refreshRuntime: true })
    }

    // site

    updateSite = async (site, payload) => {
        const res: any = await axios.post(`http://localhost:3001/api/site/${site}`, payload);
        this.setState({ sites: res.data.sites, refreshRuntime: true })
    }

    addSite = async (engine) => {
        const res: any = await axios.post(`http://localhost:3001/api/site/new`, { engine: engine });
        this.setState({ sites: res.data.sites, refreshRuntime: true })
    }

    deleteSite = async (site) => {
        const res: any = await axios.delete(`http://localhost:3001/api/site/${site}`, {});
        this.setState({ sites: res.data.sites, content: res.data.content, refreshRuntime: true })
    }

    // data

    updateData = async (data, payload) => {
        const res: any = await axios.post(`http://localhost:3001/api/data/${data}`, payload);
        this.setState({ data: res.data.data, refreshRuntime: true })
    }

    addData = async () => {
        const res: any = await axios.post(`http://localhost:3001/api/data/new`, {});
        this.setState({ data: res.data.data, refreshRuntime: true })
    }

    deleteData = async (data) => {
        const res: any = await axios.delete(`http://localhost:3001/api/data/${data}`, {});
        this.setState({ sites: res.data.sites, data: res.data.data, refreshRuntime: true })
    }

    state = {
        sites: [],
        content: [],
        data: [],
        engines: [],
        forms: [],
        refreshRuntime: false,
        runtimeRefresh: this.runtimeRefresh,
        updatePage: this.updatePage,
        addPage: this.addPage,
        deletePage: this.deletePage,
        updateContent: this.updateContent,
        addContent: this.addContent,
        deleteContent: this.deleteContent,
        updateSite: this.updateSite,
        addSite: this.addSite,
        deleteSite: this.deleteSite,
        updateData: this.updateData,
        addData: this.addData,
        deleteData: this.deleteData,
        persist: this.persist
    };

    render() {
        return (
            <AppContext.Provider value={this.state} >
                {this.props.children}
            </AppContext.Provider >
        )
    }
}
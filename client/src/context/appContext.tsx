import * as React from 'react';
import axios from 'axios';

export const AppContext = React.createContext({});

export class AppProvider extends React.PureComponent<any, any> {

    constructor(props) {
        super(props);

        let siteData = null;
        axios('http://localhost:3001/api/sites')
            .then((res: any) => {
                siteData = res.data;
                return axios('http://localhost:3001/api/content')
            })
            .then((res: any) => {
                this.setState({
                    sites: siteData,
                    content: res.data,
                    engines: [{ name: 'Bootstrap 3', value: 'bootstrap3' }, { name: 'Tailwind CSS', value: 'tailwind' }, { name: 'Skeleton CSS', value: 'skeleton' }],
                    refreshRuntime: false
                });
            })
    }

    runtimeRefresh = async () => {
        await axios.post('http://localhost:3002/api/reload', {});
        this.setState({ refreshRuntime: false });
    }

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

    updateContent = async (content, payload) => {
        const res: any = await axios.post(`http://localhost:3001/api/content/${content}`, payload);
        this.setState({ sites: res.data.sites, refreshRuntime: true })
    }

    addContent = async (site) => {
        const res: any = await axios.post(`http://localhost:3001/api/content/new`, { siteId: site });
        this.setState({ content: res.data.content, refreshRuntime: true })
    }

    deleteContent = async (content) => {
        const res: any = await axios.delete(`http://localhost:3001/api/content/${content}`, {});
        this.setState({ sites: res.data.sites, content: res.data.content, refreshRuntime: true })
    }

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

    persist = async () => {
        const res: any = await axios.post(`http://localhost:3001/api/persist`, {});
        this.setState({ sites: res.data.sites, content: res.data.content, refreshRuntime: true })
    }

    state = {
        sites: [],
        content: [],
        engines: [],
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
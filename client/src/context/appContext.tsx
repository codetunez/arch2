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

    updateContent = async (content, payload) => {
        const res: any = await axios.post(`http://localhost:3001/api/content/${content}`, payload);
        this.setState({ sites: res.data.sites, refreshRuntime: true })
    }

    updateSite = async (site, payload) => {
        const res: any = await axios.post(`http://localhost:3001/api/site/${site}`, payload);
        this.setState({ sites: res.data.sites, refreshRuntime: true })
    }

    state = {
        sites: [],
        content: [],
        refreshRuntime: false,
        runtimeRefresh: this.runtimeRefresh,
        updatePage: this.updatePage,
        updateContent: this.updateContent,
        updateSite: this.updateSite,
        addPage: this.addPage
    };

    render() {
        return (
            <AppContext.Provider value={this.state} >
                {this.props.children}
            </AppContext.Provider >
        )
    }
}
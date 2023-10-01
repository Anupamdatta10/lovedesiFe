import React, { Component } from 'react';
import '../Public/css/customAgGridPagination.css';
class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            total_count: 0,
            firstPageDisable: true,
            lastPageDisable: false
        }
    }

    componentDidMount() {
        this.setLimit();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.total_count !== prevProps.total_count) {
            this.setLimit();
        }
    }



    setLimit = () => {
        if (this.props.total_count <= this.props.pageSize) {
            this.setState({
                lastPageDisable: true,
                firstPageDisable: true
            });
        } else {
            this.setState({
                lastPageDisable: false
            });
        }
        this.setState({
            total_count: this.props.total_count
        });
    }

    nextPage = (limitStringSplitUpto, endTo, pageNo, noOfPages) => {
        //alert("nextPage")
        this.setState({
            firstPageDisable: false
        });
        if (pageNo === noOfPages - 1) {
            this.setState({
                lastPageDisable: true,
            })
        }
        this.props.nextPage(limitStringSplitUpto);
    }

    onPageSizeChanged = (event) => {
        if (event.target.value >= this.state.total_count) {
            this.setState({
                lastPageDisable: true,
                firstPageDisable: true,
            })
        } else {
            this.setState({
                lastPageDisable: false,
                firstPageDisable: true,
            })
        }
        this.props.onPageSizeChanged(event.target.value);
    }

    prevPage = (limitStringSplitUpto, pageNo) => {
        this.setState({
            lastPageDisable: false
        })
        if (pageNo === 2) {
            this.setState({
                firstPageDisable: true
            })
        }
        this.props.prevPage(limitStringSplitUpto);
    }

    firstPage = (startForm) => {
        this.setState({
            firstPageDisable: true,
            lastPageDisable: false
        })

        this.props.firstPage();
    }

    lastPage = (endTo) => {
        this.setState({
            lastPageDisable: true,
            firstPageDisable: false
        })
        if (endTo === this.state.total_count) {

            return false;
        }
        let limitString = this.props.limitStr;
        let limitStringSplitUpto = parseInt(limitString.split("_")[1]);
        let totalCount = this.props.total_count;
        let pageSize = parseInt(limitStringSplitUpto);
        let pageLastCalculate = parseInt(totalCount) / pageSize;
        let isLastData = parseInt(totalCount) % pageSize;
        let pageLast = 1;
        if (isLastData !== 0) {
            pageLast = parseInt(pageLastCalculate) * pageSize;
        } else {
            pageLast = (parseInt(pageLastCalculate) - 1) * pageSize;
        }
        let limitStirng = pageLast;
        this.props.lastPage(limitStirng);
    }

    render() {
        let limitString = this.props.limitStr;
        let limitStringSplitStart = parseInt(limitString.split("_")[0]);
        let limitStringSplitUpto = parseInt(limitString.split("_")[1]);
        let startForm = 0
        if (this.props.total_count > 0) {
            startForm = limitStringSplitStart + 1;
        }
        let endTo = limitStringSplitStart + this.props.pageDataCount;
        let totalCount = this.state.total_count;
        let noOfPages = 1;
        let pageCalculation = parseInt(totalCount / limitStringSplitUpto);
        if (totalCount % limitStringSplitUpto !== 0) {
            noOfPages = pageCalculation + 1;
        } else {
            noOfPages = pageCalculation;
        }
        let pageNo = 0;
        if (this.props.total_count > 0) {
            pageNo = parseInt(startForm / limitStringSplitUpto) + 1;
        }
        return (
            <span className="paginationRight pagination_customize">
                <span reff='eSummaryPanel_custom' className='ag-paging-row-summary-panel_custom page_start_end'>
                    <span>{startForm.toString()}</span>   <span>to</span>   <span >{endTo}</span>   <span>of</span>   <span>{totalCount.toString()}</span>
                </span>
                <span>&nbsp;</span>
                <span className='ag-paging-page-summary-panel_custom'>
                    <span>  </span>
                    <button type='button' className="ag-theme-btFirst" onClick={this.firstPage.bind(this, startForm)} disabled={this.state.firstPageDisable}>First</button>
                    <span>  </span>
                    <button type='button' className="ag-theme-btPrevious" onClick={this.prevPage.bind(this, limitStringSplitUpto, pageNo)}
                        disabled={this.state.firstPageDisable}>Previous</button>
                    <span>  </span>
                     <span className="page_label_text">Page</span> <span className="page-number-count">{pageNo}</span><span className="no_of_pages"> of <span >{noOfPages}</span></span>
                    <span>  </span>
                    <button type='button' className="ag-theme-btNext" onClick={this.nextPage.bind(this, limitStringSplitUpto, endTo, pageNo, noOfPages)}
                        disabled={this.state.lastPageDisable} >Next</button>
                    <span>  </span>
                    <button type='button' className="ag-theme-btLast" onClick={this.lastPage.bind(this, endTo)}
                        disabled={this.state.lastPageDisable}>Last</button>
                    <span>  </span>
                </span>
                <span>&nbsp;</span>
                <span className="page_size_text_label">Page Size:
								
				<span>  </span>
                    <select id='ag_pagesize'
                        value={this.props.pageSize}
                        onChange={this.onPageSizeChanged}
                        className='select-for-ag'
                    >
                        <option value='10'>10</option>
                        <option value='100'>100</option>
                        <option value='200'>200</option>
                        <option value='500'>500</option>
                        <option value='1000'>1000</option>
                        <option value='2000'>2000</option>
                    </select>
                </span>
            </span>
        );
    }
}
export default Pagination;
import paginationStyle from '../styles/Pagination.module.css';

const range = (start, end) => {
    return [...Array(end).keys()].map((item) => item+start);
}

const PaginationItem = ({page, currentPage, onPageChange, isDisabled}) => {
    return (
        <li 
            key={page}
            className={`${paginationStyle.pageItem} ${page === currentPage ? paginationStyle.active : ''} ${isDisabled ? paginationStyle.disabled : ''}`} 
            onClick={()=> onPageChange(page)}
        >
            <span className={paginationStyle.pageLink}>{page}</span>
        </li>
    );
};

const Pagination = ({currentPage, total, limit, onPageChange,}) => {
    const pagesCount = Math.ceil(total / limit);
    const pages = range(1, pagesCount);

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === pagesCount;
    return (
        <ul className={paginationStyle.pagination}>

            <PaginationItem
                page="First"
                currentPage={currentPage}
                onPageChange={()=>onPageChange(1)}
                isDisabled={isFirstPage}
            />
            <PaginationItem
                page="Prev"
                currentPage={currentPage}
                onPageChange={()=>onPageChange(currentPage - 1)}
                isDisabled={isFirstPage}
            />
            {
                pages.map((page)=>(
                    <PaginationItem 
                        page={page}
                        key={page}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                ))
            }
            <PaginationItem
                page="Next"
                currentPage={currentPage}
                onPageChange={()=>onPageChange(currentPage + 1)}
                isDisabled={isLastPage}
            />
            <PaginationItem
                page="Last"
                currentPage={currentPage}
                onPageChange={()=>onPageChange(pages.length)}
                isDisabled={isLastPage}
            />


        </ul>
    );

};

export default Pagination;
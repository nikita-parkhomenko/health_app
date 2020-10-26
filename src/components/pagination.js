
// outsource dependencies
import React from 'react';
import { Col, PaginationItem, PaginationLink, Row, Pagination } from 'reactstrap';

const PaginationField = ({ pages, currentPage, nextPage }) => {
    const pageLinks = [];

    for (let i = 0; i < pages; i++) {
        let active = currentPage === i;

        pageLinks.push(<PaginationItem
            active={active}
            key={i}
            onClick={() => nextPage(i)}
        >
            <PaginationLink href="#">
                {i + 1}
            </PaginationLink>
        </PaginationItem>);

    }
    return (
        <Row>
            <Col className="d-flex justify-content-center" sm={12}>
                <Pagination>
                    {currentPage > 0 && <PaginationItem onClick={() => nextPage(currentPage - 1)}>
                        <PaginationLink previous href="#" />
                    </PaginationItem>}

                    {pageLinks}
                    {currentPage < pages - 1 && <PaginationItem onClick={() => nextPage(currentPage + 1)} >
                        <PaginationLink next href="#" />
                    </PaginationItem>}
                </Pagination>
            </Col>
        </Row>
    );
}

export default PaginationField;

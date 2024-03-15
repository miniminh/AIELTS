package common

const MAX_PAGE_LIMIT = 24

type Pagination struct {
	Page  int32 `json:"page" form:"page"`
	Limit int32 `json:"limit" form:"limit"`
	Total int64 `json:"total" form:"total"`
}

func (p *Pagination) Normalize() {
	if p.Page <= 0 {
		p.Page = 1
	}

	if p.Limit <= 0 || p.Limit >= MAX_PAGE_LIMIT {
		p.Limit = MAX_PAGE_LIMIT
	}
}

func (Pagination) GetDefault() *Pagination {
	defaultPaging := Pagination {}
	defaultPaging.Normalize()
	return &defaultPaging
}
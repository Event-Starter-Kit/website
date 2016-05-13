export class PagedResult<T> {
	public pageSize: number;
	public pageIndex: number;
	public totalCount: number;
	public result: T[];

	constructor(pageIndex: number, pageSize: number, result: T[], totalCount: number) {
		this.pageSize = pageSize;
		this.pageIndex = pageIndex;
		this.result = result;
		this.totalCount = totalCount;
	}

	public hasNextPage(): Boolean {
		return ((this.pageIndex + 1) < this.totalCount);
	}

	public hasPreviousPage(): Boolean {
		return this.pageIndex > 0;
	}

	public TotalPages(): number {
		if (!this.result || this.result.length === 0) {
			return 0;
		}

		return Math.floor(this.totalCount / this.pageSize) + (this.totalCount % this.pageSize === 0
			? 0
			: 1);
	}
}

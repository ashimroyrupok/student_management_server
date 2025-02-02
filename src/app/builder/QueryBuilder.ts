import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search() {
    const subjectCode = this?.query?.subjectCode;
    const semester = this?.query?.semester;

    if (semester && subjectCode) {
      console.log(semester, subjectCode, "search semester and subjectCode");

      this.modelQuery = this.modelQuery.find({
       "semester": semester,
        "subjectCodes.0": {
          $elemMatch: { $in: [subjectCode] },
        },
      });
    } else if (semester) {
      console.log(semester, "search semester");
      this.modelQuery = this.modelQuery.find({
        "semester": semester,
      });
    } else if (subjectCode) {
      console.log(subjectCode, "search subjectCode");
      this.modelQuery = this.modelQuery.find({
        "subjectCodes.0": { $elemMatch: { $in: [subjectCode] } },
      });
    }

    // if (semester) {
    //   console.log(semester, "search semester");
    //   this.modelQuery = this.modelQuery.find({
    //     semester: semester,
    //   });
    // }
    // if (subjectCode) {
    //   console.log(subjectCode, "search subjectcode");
    //   this.modelQuery = this.modelQuery.find({
    //     subjectCodes: { $elemMatch: { $in: [subjectCode] } },
    //   });
    // }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // copy
    console.log({ queryObj });

    // Filtering
    const excludeFields = ["subjectCode", "limit", "page", "semester"];

    excludeFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj, "22");
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;

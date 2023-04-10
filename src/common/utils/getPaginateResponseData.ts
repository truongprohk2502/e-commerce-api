import { PaginationDto } from '../pagination.dto';

export const getPaginateResponseData = (
  paginationDto: PaginationDto,
  data: any,
  total: number,
) => {
  const { page, limit } = paginationDto;
  return {
    metaData: {
      page,
      limit,
      total,
    },
    data,
  };
};

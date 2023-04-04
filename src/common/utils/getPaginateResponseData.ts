import { PaginationDto } from '../pagination.dto';

export const getPaginateResponseData = (
  paginationDto: PaginationDto,
  data: any,
  total: number,
) => {
  const { page, limit } = paginationDto;
  return {
    meta_data: {
      page,
      limit,
      total,
    },
    data,
  };
};

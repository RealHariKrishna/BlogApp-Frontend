import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

let isFirstRun = true;

export const useDataTable = ({
  dataQueryFn,
  dataQueryKey,
  mutateDeleteFn,
  deleteDataMessage,
}) => {
  const userState = useSelector((state) => state.user);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryFn: dataQueryFn,
    queryKey: [dataQueryKey],
  });

  const { mutate: mutateDeletePost, isLoading: isLoadingDeleteData } =
    useMutation({
      mutationFn: mutateDeleteFn,
      onSuccess: (data) => {
        queryClient.invalidateQueries([dataQueryKey]);
        toast.success(deleteDataMessage);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);

  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const deleteDataHandler = ({ slug, token }) => {
    mutateDeletePost({ slug, token });
  };

  return {
    userState,
    currentPage,
    searchKeyword,
    data,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  };
};

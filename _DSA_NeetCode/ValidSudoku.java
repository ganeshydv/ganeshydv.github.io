import java.util.HashSet;
import java.util.Set;

public class ValidSudoku {
    public static void main(String[] args) {
        char[][] board=new char[][]{
            {'.','.','.','.','5','.','.','1','.'},
            {'.','4','.','3','.','.','.','.','.'},
            {'.','.','.','.','.','3','.','.','1'},
            {'8','.','.','.','.','.','.','2','.'},
            {'.','.','2','.','7','.','.','.','.'},
            {'.','1','5','.','.','.','.','.','.'},
            {'.','.','.','.','.','2','.','.','.'},
            {'.','2','.','9','.','.','.','.','.'},
            {'.','.','4','.','.','.','.','.','.'}};

        System.out.println(isValidSudoku(board));
    }

    static public boolean isValidSudoku(char[][] board) {
        return checkValidSudoku(board,board.length,board[0].length);
    }
    static boolean checkValidSudoku(char[][] board,int row,int col){
       
        for(int row_=0;row_<row;row_++){
            Set<Character> set=new HashSet<>();
            for(int col_=0;col_<col;col_++){
                if(!set.contains(board[row_][col_]) || board[row_][col_] =='.'){
                    if(board[row_][col_]!='.') set.add(board[row_][col_]);
                }else return false;
            }
        }
        for(int col_=0;col_<col;col_++){//
            Set<Character> set=new HashSet<>();
            for(int row_=0;row_<row;row_++){
                if(!set.contains(board[row_][col_]) || board[row_][col_] =='.'){
                    if(board[row_][col_]!='.') set.add(board[row_][col_]);
                }else return false;
            }
        }
        // search in 3X3 matrix
        for(int i=0;i<9;i+=3){
            for(int j=0;j<9;j+=3){
                Set<Character> set=new HashSet<>();
                for(int row_=i;row_<i+3;row_++){
                    for(int col_=j;col_<j+3;col_++){
                        if(!set.contains(board[row_][col_]) || board[row_][col_] =='.'){
                            if(board[row_][col_]!='.') set.add(board[row_][col_]);
                        }else return false;
                    }
                }
            }
        }

        return true;
    }
}

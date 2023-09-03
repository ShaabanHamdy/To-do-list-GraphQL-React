import { gql } from "@apollo/client";



export const GET_NOTES = gql`
  query {
    getNotes {
      id
      title
      description
    }
  }
`;
// ============================================================================
export const CREATE_NOTES = gql`
  mutation create_note( $title:String! $description:String!){
    create_note( title:$title description:$description){
        title
        description
    }
  }
`;

// ============================================================================
export const DELETE_NOTES = gql`
  mutation delete_note( $id:String!){
    delete_note(id:$id){
      id
    }
  }
`;

// ============================================================================
export const UPDATE_NOTES = gql`
  mutation update_note( $id:String! $title:String! $description:String!){
    update_note(id:$id title:$title description:$description){
      id
      title
      description
    }
  }
`;
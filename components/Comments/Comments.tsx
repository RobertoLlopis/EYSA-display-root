import { useMutation } from "@apollo/client";
import { Comment, Form, Button, Input, Divider } from "antd";
import { useAuthContext } from "context/AuthContext";
import { useState } from "react";
import { mutationDeclarations } from "utils/mutationDeclarations";

import styles from "./Comments.module.scss";

const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <Form>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </Form>
);
function Comments({ comments, filmId }) {
  const { user } = useAuthContext();
  const [stateComments, setStateComments] = useState(comments);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [addComment] = useMutation(mutationDeclarations.ADD_COMMENT);
  function handleChange(e) {
    setValue(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!value) return;
    setSubmitting(true);
    const newComment = { user, message: value, filmId };
    try {
      addComment({ variables: { user, message: value, filmId } });
    } catch (error) {
      alert(error.message);
    }
    setStateComments([...stateComments, newComment]);
    setValue("");
    setSubmitting(false);
  }
  return (
    <section className={styles.commentsSection}>
      <h3>Comments</h3>
      <Divider orientation="left">{`${comments.length} ${
        comments.length > 1 ? "replies" : "reply"
      }`}</Divider>
      {comments.length > 0 &&
        stateComments.map((c, i) => (
          <Comment key={i} author={c.user} content={c.message} />
        ))}
      <Comment
        author={user}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </section>
  );
}

export default Comments;

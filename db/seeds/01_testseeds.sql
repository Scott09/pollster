INSERT INTO polls (creator_name, creator_email,admin_url,submission_url,question) VALUES ('Alice','jiadanwang@gmail.com','localhost:8080/aaaaaa','localhost:8080/bbbbbb', 'movie?');

INSERT INTO voters(name, poll_id) VALUES ('Scott','1');

INSERT INTO voters(name, poll_id) VALUES ('Jiadan','1');

INSERT INTO voters(name, poll_id) VALUES ('Aidan','1');

INSERT INTO choices (poll_id, description, title) VALUES ('1','hahaha','Lion King');

INSERT INTO choices (poll_id, description, title) VALUES ('1','hehehe','Resident Evil');

INSERT INTO choices (poll_id, description, title) VALUES ('1','hahaha','Toy story');

INSERT INTO voter_choices(voter_id,choice_id,choice_rank) VALUES ('1','1','3');

INSERT INTO voter_choices(voter_id,choice_id,choice_rank) VALUES ('1','2','2');

INSERT INTO voter_choices(voter_id,choice_id,choice_rank) VALUES ('1','3','1');

INSERT INTO voter_choices(voter_id,choice_id,choice_rank) VALUES ('2','1','3');

INSERT INTO voter_choices(voter_id,choice_id,choice_rank) VALUES ('2','2','2');

INSERT INTO voter_choices(voter_id,choice_id,choice_rank) VALUES ('2','3','1');

INSERT INTO voter_choices(voter_id,choice_id,choice_rank) VALUES ('3','1','3');

INSERT INTO voter_choices(voter_id,choice_id,choice_rank) VALUES ('3','2','2');

INSERT INTO voter_choices(voter_id,choice_id,choice_rank) VALUES ('3','3','1');

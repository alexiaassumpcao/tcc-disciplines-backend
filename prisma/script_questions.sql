-- script para criar as questoes

--atuais ids dos perfils de preferencia
--5891d57d-8d78-4627-b6f2-618464d7d90b	Não específica
--e56ba795-00b1-4770-b9ae-6e7c32954bb9	Algoritmos e Combinatória(otim)
--5d471bfb-cd8e-41a2-87b9-f8919b9be249	Engenharia de Sistemas e Informação (web, req, design)
--ac3cd604-45dc-45e5-b576-49267dfc07ca	Sistemas de Computação (redes, infra, jogo)
--8e902b88-e82c-4feb-8bcf-a8cd8b0dff10	Sistemas Inteligentes (Area de dados, IA)

INSERT INTO "PreferenceQuestion"  (id, text, "uniqueName", options, "questionType", rate, "createdAt", "deletedAt")
VALUES ('ee1c4dac-d5f6-489e-a17f-e02124136df3', 'Possui experiência prática em algumas das áreas computacionais e gostou?', 'liked-areas', '[{"label":"Área de dados", "preference_value":"8e902b88-e82c-4feb-8bcf-a8cd8b0dff10"}, {"label":"Redes", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"}, {"label":"Desenvolvimento Web", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"},{"label":"Engenharia de Requisitos", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"},{"label":"Infraestrutura de Sistemas", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"},{"label":"Design de Arquitetura", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"},{"label":"Otimização de Problemas Computacionais", "preference_value":"e56ba795-00b1-4770-b9ae-6e7c32954bb9"},{"label":"Desenvolvimento de Jogos", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07c"},{"label":"Inteligência Artificial", "preference_value":"8e902b88-e82c-4feb-8bcf-a8cd8b0dff10"}]', 
'MULTI_OPTION', 'POSITIVE', now(), null);

INSERT INTO "PreferenceQuestion"  (id, text, "uniqueName", options, "questionType", rate, "createdAt", "deletedAt")
VALUES ('9c17fc4a-3ce8-4af7-8063-f8a7c62d1bea', 'Possui experiência prática em algumas das áreas computacionais e não
gostou?', 'disliked-areas', '[{"label":"Área de dados", "preference_value":"8e902b88-e82c-4feb-8bcf-a8cd8b0dff10"}, {"label":"Redes", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"}, {"label":"Desenvolvimento Web", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"},{"label":"Engenharia de Requisitos", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"},{"label":"Infraestrutura de Sistemas", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"},{"label":"Design de Arquitetura", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"},{"label":"Otimização de Problemas Computacionais", "preference_value":"e56ba795-00b1-4770-b9ae-6e7c32954bb9"},{"label":"Desenvolvimento de Jogos", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07c"},{"label":"Inteligência Artificial", "preference_value":"8e902b88-e82c-4feb-8bcf-a8cd8b0dff10"}]', 
'MULTI_OPTION', 'NEGATIVE', now(), null);

INSERT INTO "PreferenceQuestion"  (id, text, "uniqueName", options, "questionType", rate, "createdAt", "deletedAt")
VALUES ('d4cf0017-d726-41c8-a3db-04cfabcb1273', 'Possui interesse em uma ou mais áreas a seguir?', 'intrested-areas', '[{"label":"Área de dados", "preference_value":"8e902b88-e82c-4feb-8bcf-a8cd8b0dff10"}, {"label":"Redes", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"}, {"label":"Desenvolvimento Web", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"},{"label":"Engenharia de Requisitos", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"},{"label":"Infraestrutura de Sistemas", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"},{"label":"Design de Arquitetura", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"},{"label":"Otimização de Problemas Computacionais", "preference_value":"e56ba795-00b1-4770-b9ae-6e7c32954bb9"},{"label":"Desenvolvimento de Jogos", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07c"},{"label":"Inteligência Artificial", "preference_value":"8e902b88-e82c-4feb-8bcf-a8cd8b0dff10"}]', 
'MULTI_OPTION', 'NEGATIVE', now(), null);

INSERT INTO "PreferenceQuestion"  (id, text, "uniqueName", options, "questionType", rate, "createdAt", "deletedAt")
VALUES ('5d82680a-d3e8-4976-85cf-97ee5904d734', 'Gostaria de aprender a como planejar o passo a passo do desenvolvimento de um software?', 'positive-dev-software', '[{"label":"Sim", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"}, {"label":"Não", "preference_value":""}, {"label":"Talvez", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"}]',
'ONE_OPTION', 'POSITIVE', now(), null);

INSERT INTO "PreferenceQuestion"  (id, text, "uniqueName", options, "questionType", rate, "createdAt", "deletedAt")
VALUES ('23a685ad-6260-4eeb-93a2-778042e36770', 'Gostaria de aprender mais sobre programação paralela?', 'positive-paralell-dev', '[{"label":"Sim", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"}, {"label":"Não", "preference_value":""}, {"label":"Talvez", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"}]',
'ONE_OPTION', 'POSITIVE', now(), null);

INSERT INTO "PreferenceQuestion"  (id, text, "uniqueName", options, "questionType", rate, "createdAt", "deletedAt")
VALUES ('66018a49-721f-4438-a31a-f3477f715a9d', 'Gostaria de aprender mais sobre Desenvolvimento Web?', 'positive-dev-web', '[{"label":"Sim", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"}, {"label":"Não", "preference_value":""}, {"label":"Talvez", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"}]',
'ONE_OPTION', 'POSITIVE', now(), null);

INSERT INTO "PreferenceQuestion"  (id, text, "uniqueName", options, "questionType", rate, "createdAt", "deletedAt")
VALUES ('72e654b5-5dd7-4d50-8e4d-959749c17fed', 'Gostaria de aprender mais sobre algorítmos de otimização?', 'positive-otimization', '[{"label":"Sim", "preference_value":"e56ba795-00b1-4770-b9ae-6e7c32954bb9"}, {"label":"Não", "preference_value":""}, {"label":"Talvez", "preference_value":"e56ba795-00b1-4770-b9ae-6e7c32954bb9"}]',
'ONE_OPTION', 'POSITIVE', now(), null);

INSERT INTO "PreferenceQuestion"  (id, text, "uniqueName", options, "questionType", rate, "createdAt", "deletedAt")
VALUES ('ebc60112-91ba-4dc0-aa85-a549ae9245f4', 'Gostaria de aprender mais sobre análise de dados?', 'positive-data', '[{"label":"Sim", "preference_value":"8e902b88-e82c-4feb-8bcf-a8cd8b0dff10"}, {"label":"Não", "preference_value":""}, {"label":"Talvez", "preference_value":"8e902b88-e82c-4feb-8bcf-a8cd8b0dff10"}]',
'ONE_OPTION', 'POSITIVE', now(), null);

INSERT INTO "PreferenceQuestion"  (id, text, "uniqueName", options, "questionType", rate, "createdAt", "deletedAt")
VALUES ('6167f4da-d2ee-4c96-8fab-cf5669c6b794', 'Gostaria de aprender mais sobre Redes de computadores?', 'positive-rede-computer', '[{"label":"Sim", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"}, {"label":"Não", "preference_value":""}, {"label":"Talvez", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"}]',
'ONE_OPTION', 'POSITIVE', now(), null);

INSERT INTO "PreferenceQuestion"  (id, text, "uniqueName", options, "questionType", rate, "createdAt", "deletedAt")
VALUES ('3cee8c31-e180-4f49-b02a-7aeaab4c68d5', 'Gostaria de aprender mais sobre tipos de memoria?', 'positive-memory', '[{"label":"Sim", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"}, {"label":"Não", "preference_value":""}, {"label":"Talvez", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"}]',
'ONE_OPTION', 'POSITIVE', now(), null);

INSERT INTO "PreferenceQuestion"  (id, text, "uniqueName", options, "questionType", rate, "createdAt", "deletedAt")
VALUES ('38432780-00a4-47a9-a665-d66f56758721', 'Gostaria de aprender mais sobre linguagem de máquina?', 'positive-machine-language', '[{"label":"Sim", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"}, {"label":"Não", "preference_value":""}, {"label":"Talvez", "preference_value":"ac3cd604-45dc-45e5-b576-49267dfc07ca"}]',
'ONE_OPTION', 'POSITIVE', now(), null);

INSERT INTO "PreferenceQuestion"  (id, text, "uniqueName", options, "questionType", rate, "createdAt", "deletedAt")
VALUES ('165d6499-edae-4c77-95f9-f1169e4f3f4e', 'Gostaria de aprender mais sobre Banco de dados e suas modelagens?', 'positive-database', '[{"label":"Sim", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"}, {"label":"Não", "preference_value":""}, {"label":"Talvez", "preference_value":"5d471bfb-cd8e-41a2-87b9-f8919b9be249"}]',
'ONE_OPTION', 'POSITIVE', now(), null);

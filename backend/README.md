# 백엔드 README

## DB 및 JPA 설계

- 먼저 ERD와 DDL로 DB를 설계한 후에 JPA의 Entity를 매핑하는 방식으로 작업했습니다.
- N:1 관계는 @ManyToOne으로 단방향 관계를 구현했습니다.
- M:N 관계는 매핑 테이블을 생성한 후에 

use loco_rs::schema::*;
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, m: &SchemaManager) -> Result<(), DbErr> {
        create_table(m, "monitors",
            &[
            
            ("id", ColType::PkAuto),
            
            ("url", ColType::StringNull),
            ("check_interval", ColType::IntegerNull),
            ("is_active", ColType::BooleanNull),
            ("expected_text", ColType::TextNull),
            ("allow_redirects", ColType::BooleanNull),
            ],
            &[
            ("user", ""),
            ]
        ).await
    }

    async fn down(&self, m: &SchemaManager) -> Result<(), DbErr> {
        drop_table(m, "monitors").await
    }
}

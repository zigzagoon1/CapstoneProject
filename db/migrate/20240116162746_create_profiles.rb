class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|

      t.string :dob
      t.string :bio
      t.integer :games_played
      t.integer :user_id

      t.timestamps
    end
  end
end

class CreateImages < ActiveRecord::Migration[6.1]
  def change
    create_table :images do |t|
      t.string :src
      t.string :alt
      t.integer :scale

      t.timestamps
    end
  end
end

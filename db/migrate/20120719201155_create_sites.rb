class CreateSites < ActiveRecord::Migration
  def change
    create_table :sites do |t|
      t.string        :name
      t.string        :ident
      t.text          :url

      t.string        :category
      t.integer       :position

      t.integer       :snapshots_count, :default => 0

      t.references    :last_snapshot
      t.string        :last_snapshot_preview
      t.datetime      :last_snapshot_at

      t.timestamps
    end
  end
end

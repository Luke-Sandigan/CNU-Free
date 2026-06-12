import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.LineBorder;
import java.awt.*;

public class FriendCard extends JPanel {

    public FriendCard(Friend friend, String day) {
        setLayout(new BorderLayout());
        setPreferredSize(new Dimension(300, 65)); 
        setMaximumSize(new Dimension(2000, 65)); 
        
        setBackground(Color.WHITE);
        setBorder(BorderFactory.createCompoundBorder(
            new LineBorder(new Color(200, 200, 200), 1, true),
            new EmptyBorder(5, 15, 5, 15)
        ));
        
        JLabel nameLabel = new JLabel(friend.getName());
        nameLabel.setFont(new Font("Arial", Font.BOLD, 20));
        nameLabel.setForeground(new Color(50, 50, 50));
        add(nameLabel, BorderLayout.WEST);

        JPanel timePanel = new JPanel(new GridLayout(2, 1, 0, 2));
        timePanel.setBackground(Color.WHITE);
        
        Friend.Schedule sched = friend.getScheduleForDay(day);
        
        if (sched != null) {
            JLabel lunchLabel = new JLabel("Lunch: " + sched.getLunchTime());
            lunchLabel.setHorizontalAlignment(SwingConstants.RIGHT);
            lunchLabel.setFont(new Font("Arial", Font.BOLD, 13));
            lunchLabel.setForeground(new Color(34, 139, 34));

            JLabel dismissLabel = new JLabel("Dismissal: " + sched.getDismissalTime());
            dismissLabel.setHorizontalAlignment(SwingConstants.RIGHT);
            dismissLabel.setFont(new Font("Arial", Font.BOLD, 13));
            dismissLabel.setForeground(new Color(65, 105, 225));

            timePanel.add(lunchLabel);
            timePanel.add(dismissLabel);
        } else {
            JLabel freeLabel = new JLabel("No Class Today");
            freeLabel.setHorizontalAlignment(SwingConstants.RIGHT);
            freeLabel.setFont(new Font("Arial", Font.ITALIC, 14));
            freeLabel.setForeground(Color.LIGHT_GRAY);
            
            timePanel.setLayout(new BorderLayout());
            timePanel.add(freeLabel, BorderLayout.CENTER);
        }

        add(timePanel, BorderLayout.EAST);
    }
}